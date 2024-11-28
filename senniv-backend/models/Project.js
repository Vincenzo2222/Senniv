// models/Project.js
const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  titolo: { type: String, required: true },
  descrizione: { type: String },
  utente: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  dataCreazione: { type: Date, default: Date.now },
  progressi: { type: Object, default: {} },
});

module.exports = mongoose.model('Project', ProjectSchema);
