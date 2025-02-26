const express = require('express');
const fs = require('fs');
const cors = require('cors');
const bcrypt = require('bcrypt'); // Pour hacher les mots de passe
const app = express();

app.use(express.json());
app.use(cors());

const DATA_FILE = 'data.json';
const USERS_FILE = 'users.json';



// Fonction pour lire les utilisateurs
const readUsers = () => {
    const data = fs.readFileSync(USERS_FILE);
    return JSON.parse(data);
};

// Inscription
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    let users = readUsers();

    if (users.find(u => u.username === username)) {
        return res.status(400).json({ error: 'Utilisateur déjà existant' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { id: Date.now(), username, password: hashedPassword };

    users.push(newUser);
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));

    res.json({ message: 'Inscription réussie' });
});

// Connexion
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    let users = readUsers();
    
    const user = users.find(u => u.username === username);
    if (!user) return res.status(400).json({ error: 'Utilisateur introuvable' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Mot de passe incorrect' });

    res.json({ message: 'Connexion réussie', user: { id: user.id, username: user.username } });
});

app.listen(5000, () => console.log('✅ Backend démarré sur http://localhost:5000'));





// Lire les utilisateurs
app.get('/users', (req, res) => {
    fs.readFile(DATA_FILE, (err, data) => {
        if (err) return res.status(500).json({ error: 'Erreur lecture fichier' });
        res.json(JSON.parse(data));
    });
});

// Ajouter un utilisateur
app.post('/users', (req, res) => {
    fs.readFile(DATA_FILE, (err, data) => {
        if (err) return res.status(500).json({ error: 'Erreur lecture fichier' });

        let users = JSON.parse(data);
        const newUser = { id: Date.now(), ...req.body };
        users.push(newUser);

        fs.writeFile(DATA_FILE, JSON.stringify(users, null, 2), (err) => {
            if (err) return res.status(500).json({ error: 'Erreur écriture fichier' });
            res.json(newUser);
        });
    });
});

app.listen(5000, () => console.log('✅ Backend démarré sur http://localhost:5000'));


// Supprimer un utilisateur par ID
app.delete('/users/:id', (req, res) => {
    fs.readFile(DATA_FILE, (err, data) => {
        if (err) return res.status(500).json({ error: 'Erreur lecture fichier' });

        let users = JSON.parse(data);
        const userId = parseInt(req.params.id); // Récupérer l'ID dans l'URL
        const newUsers = users.filter(user => user.id !== userId); // Filtrer les utilisateurs

        if (users.length === newUsers.length) {
            return res.status(404).json({ error: 'Utilisateur non trouvé' });
        }

        fs.writeFile(DATA_FILE, JSON.stringify(newUsers, null, 2), (err) => {
            if (err) return res.status(500).json({ error: 'Erreur écriture fichier' });
            res.json({ message: 'Utilisateur supprimé', id: userId });
        });
    });
});
