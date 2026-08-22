import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { authenticateAdmin } from '../middleware/auth.js';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectsFilePath = path.join(__dirname, '../data/projects.json');

// Helper to read projects JSON
function readProjects() {
  try {
    const data = fs.readFileSync(projectsFilePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading projects.json:', err);
    return [];
  }
}

// Helper to write projects JSON
function writeProjects(projects) {
  try {
    fs.writeFileSync(projectsFilePath, JSON.stringify(projects, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error('Error writing projects.json:', err);
    return false;
  }
}

// GET all projects (Public: returns published, Admin: returns all if requested)
router.get('/', (req, res) => {
  const projects = readProjects();
  const showAll = req.query.all === 'true';

  if (showAll) {
    // Return all projects for admin dashboard
    return res.json(projects.sort((a, b) => (a.order || 0) - (b.order || 0)));
  }

  // Filter only published projects for public visitors
  const publishedProjects = projects
    .filter(p => p.published !== false)
    .sort((a, b) => (a.order || 0) - (b.order || 0));

  res.json(publishedProjects);
});

// GET single project by ID or slug
router.get('/:id', (req, res) => {
  const projects = readProjects();
  const project = projects.find(p => p.id === req.params.id || p.slug === req.params.id);

  if (!project) {
    return res.status(404).json({ error: 'Project not found' });
  }

  res.json(project);
});

// POST Create new project (Protected)
router.post('/', authenticateAdmin, (req, res) => {
  const projects = readProjects();
  const newProject = {
    id: req.body.id || `proj_${Date.now()}`,
    name: req.body.name || 'New Project',
    slug: req.body.slug || (req.body.name ? req.body.name.toLowerCase().replace(/\s+/g, '-') : `proj-${Date.now()}`),
    tagline: req.body.tagline || '',
    description: req.body.description || '',
    problem: req.body.problem || '',
    solution: req.body.solution || '',
    features: Array.isArray(req.body.features) ? req.body.features : [],
    technologies: Array.isArray(req.body.technologies) ? req.body.technologies : [],
    category: req.body.category || 'Full Stack',
    role: req.body.role || 'Developer',
    github: req.body.github || 'https://github.com/mohdahtesham09',
    live: req.body.live || '#',
    image: req.body.image || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop&q=80',
    screenshots: Array.isArray(req.body.screenshots) ? req.body.screenshots : [],
    architecture: req.body.architecture || '',
    metrics: req.body.metrics || '',
    featured: req.body.featured !== undefined ? req.body.featured : false,
    published: req.body.published !== undefined ? req.body.published : true,
    pinned: req.body.pinned !== undefined ? req.body.pinned : false,
    order: projects.length + 1
  };

  projects.push(newProject);
  if (writeProjects(projects)) {
    res.status(201).json({ success: true, project: newProject });
  } else {
    res.status(500).json({ error: 'Failed to save new project' });
  }
});

// PUT Update existing project (Protected)
router.put('/reorder', authenticateAdmin, (req, res) => {
  const { orderedIds } = req.body;
  if (!Array.isArray(orderedIds)) {
    return res.status(400).json({ error: 'orderedIds must be an array' });
  }

  let projects = readProjects();
  orderedIds.forEach((id, index) => {
    const projIndex = projects.findIndex(p => p.id === id);
    if (projIndex !== -1) {
      projects[projIndex].order = index + 1;
    }
  });

  if (writeProjects(projects)) {
    res.json({ success: true, projects });
  } else {
    res.status(500).json({ error: 'Failed to reorder projects' });
  }
});

router.put('/:id', authenticateAdmin, (req, res) => {
  let projects = readProjects();
  const index = projects.findIndex(p => p.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ error: 'Project not found' });
  }

  projects[index] = {
    ...projects[index],
    ...req.body,
    id: projects[index].id // Ensure ID remains immutable
  };

  if (writeProjects(projects)) {
    res.json({ success: true, project: projects[index] });
  } else {
    res.status(500).json({ error: 'Failed to update project' });
  }
});

// DELETE Project (Protected)
router.delete('/:id', authenticateAdmin, (req, res) => {
  let projects = readProjects();
  const filtered = projects.filter(p => p.id !== req.params.id);

  if (filtered.length === projects.length) {
    return res.status(404).json({ error: 'Project not found' });
  }

  if (writeProjects(filtered)) {
    res.json({ success: true, message: 'Project deleted successfully' });
  } else {
    res.status(500).json({ error: 'Failed to delete project' });
  }
});

export default router;
