const express = require('express');
const app = express();
const PORT = 3000;

//  Middleware
// Parses incoming JSON
app.use(express.json());

// Logs all requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});


let tasks = [
  { id: 1, title: 'Learn Express.js' },
  { id: 2, title: 'Build a simple API' }
];

// Routes 

// GET all tasks
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// POST a new task
app.post('/tasks', (req, res) => {
  const { title } = req.body;
  const newTask = {
    id: tasks.length + 1,
    title: title
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// PUT (update) a task
app.put('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { title } = req.body;
  const task = tasks.find(t => t.id === id);
  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }
  task.title = title;
  res.json(task);
});

// DELETE a task
app.delete('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  tasks = tasks.filter(t => t.id !== id);
  res.json({ message: 'Task deleted successfully' });
});

// Start Server 
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
