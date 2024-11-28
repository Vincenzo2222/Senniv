const express = require('express');
const auth = require('../middleware/auth');
const Project = require('../models/Project');

const router = express.Router();

// Get projects
router.get('/', auth, async (req, res) => {
  try {
    const projects = await Project.find({ userId: req.user.id });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

module.exports = router;
