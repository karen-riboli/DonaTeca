import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import supabase from './database/supabase.js';

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

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
 
  if (!title?.trim() || !author?.trim()) {
    return res.status(400).json({
      error: 'Título e autor  são obrigatórios.'
    });
  }

  const { data, error } = await supabase
    .from('books')
    .insert([{ title, author, is_read: isRead }])
    .select();
  if (error) {
    return res.status(500).json({
      error: error.message,
    });
  }

  res.status(201).json({
    books: data,
  });
});

app.delete('/api/books/:id', async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase.from('books').delete().eq('id', id).select();

  if (error) {
    return res.status(500).json({
      error: error.message,
    });
  }

  if (data.length === 0) {
    return res.status(404).json({
      error: 'Livro não encontrado.',
    })
  }

  res.sendStatus(204);
});

app.patch('/api/books/:id', async (req, res) => {
  const { id } = req.params;
  const { title, author, isRead } = req.body;

  const updates = {};
  if (title !== undefined) {
    updates.title = title;
  }
  if (author !== undefined) {
    updates.author = author;
  }
  if (isRead !== undefined) {
    updates.is_read = isRead;
  }

  const { data, error } = await supabase
    .from('books')
    .update(updates)
    .eq('id', id)
    .select();

  if (error) {
    return res.status(500).json({
      error: error.message,
    });
  }

  if (data.length === 0) {
    return res.status(404).json({
      error: 'Livro não encontrado.',
    })
  }

  res.status(200).json({
    books: data,
  });
});
