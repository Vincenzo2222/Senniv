const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

router.get('/', auth, async (req, res) => {
  try {
    // Recupera l'idea iniziale (simulata per ora)
    const idea = 'Negozio di accessori per gatti'; // Simula il recupero dell'idea dell'utente

    // Struttura la dashboard in base all'idea
    const progresso = [
      { id: 1, titolo: `Brainstorming per: ${idea}`, completato: true },
      { id: 2, titolo: 'Validazione dell\'Idea', completato: false },
      { id: 3, titolo: 'Creazione Business Plan', completato: false },
      { id: 4, titolo: 'Progettazione del Prodotto', completato: false },
      { id: 5, titolo: 'Strategia di Marketing', completato: false },
    ];

    // Restituisce direttamente l'array
    res.json(progresso);
  } catch (err) {
    console.error('Errore durante il caricamento della dashboard:', err.message);
    res.status(500).json({ error: 'Errore durante il caricamento della dashboard' });
  }
});

module.exports = router;
