const express = require('express');
const app = express();
const port = 3000;

// Middleware: vérifier les heures ouvrables
app.use((req, res, next) => {
  const now = new Date();
  const day = now.getDay(); // 0 = dimanche, 6 = samedi
  const hour = now.getHours();

  if (day >= 1 && day <= 5 && hour >= 9 && hour < 17) {
    next();
  } else {
    res.send('<h1>⏰ Le site est disponible du lundi au vendredi, de 9h à 17h.</h1>');
  }
});

// Config
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', './views');

// Routes
app.get('/', (req, res) => res.render('home'));
app.get('/services', (req, res) => res.render('services'));
app.get('/contact', (req, res) => res.render('contact'));

// Start server
app.listen(port, () => {
  console.log(`✅ Serveur lancé sur http://localhost:${port}`);
});
