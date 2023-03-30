const express = require('express');
const app = express();

// Liste des tâches
let tasks = [];

// GET - Récupérer la liste des tâches
app.get('/api/tasks', (req, res) => {
    res.json(tasks);
});

// POST - Ajouter une tâche
app.post('/api/tasks', (req, res) => {
    const task = req.body;
    task.key = Date.now();
    tasks.push(task);
    res.json(task);
});

// DELETE - Supprimer une tâche
app.delete('/api/tasks/:key', (req, res) => {
    const key = parseInt(req.params.key);
    tasks = tasks.filter(task => task.key !== key);
    res.sendStatus(200);
});

// PUT - Modifier une tâche
app.put('/api/tasks/:key', (req, res) => {
    const key = parseInt(req.params.key);
    const text = req.body.text;
    tasks.forEach(task => {
        if (task.key === key) {
            task.text = text;
        }
    });
    res.sendStatus(200);
});

// Démarrer le serveur
const port = 5000;
app.listen(port, () => console.log(`Serveur démarré sur le port ${port}`));

