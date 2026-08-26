import express from 'express';
import cors from 'cors';
import supabase from './database/supabase.js';

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get('/api/books', async (req, res) => {
  const { data, error } = await supabase
    .from('books')
    .select('*')
    .order('id', { ascending: true });

  if (error) {
    return res.status(500).json({
      error: error.message,
    });
  }

  res.json({
    books: data,
  });
});

app.post('/api/books', async (req, res) => {
  const { title, author, isRead } = req.body;
  const { data, error } = await supabase
    .from('books')
    .insert([{ title, author, is_read: isRead }])
    .select();
  if (error) {
    return res.status(500).json({
      error: error.message,
    });
  }

  res.status(201).json({ data });
});

app.delete('/api/books/:id', async (req, res) => {
  const { id } = req.params;
  const { error } = await supabase.from('books').delete().eq('id', id).select();

  if (error) {
    return res.status(500).json({
      error: error.message,
    });
  }

  res.sendStatus(204);
});

app.patch('/api/books/:id', async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const { author } = req.body;
  const { isRead } = req.body;

  const { data, error } = await supabase
    .from('books')
    .update({
      title,
      author,
      is_read: isRead,
    })
    .eq('id', id)
    .select();

  if (error) {
    return res.status(500).json({
      error: error.message,
    });
  }

  res.status(200).json(data);
});
