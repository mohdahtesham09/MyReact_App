import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const configPath = path.join(__dirname, '../data/config.json');

// Default configuration
const defaultConfig = {
  resumeUrl: "https://drive.google.com/file/d/1GSbzaLSAi-FO-MsoQA516f76JO-P6Pvl/view",
  resumePdfUrl: "/resume.pdf",
  contactEmail: "fsdahtesham@gmail.com",
};

// Ensure config file exists
function readConfig() {
  try {
    if (fs.existsSync(configPath)) {
      const raw = fs.readFileSync(configPath, 'utf-8');
      return { ...defaultConfig, ...JSON.parse(raw) };
    }
  } catch (err) {
    console.error("Config read error:", err);
  }
  return defaultConfig;
}

function saveConfig(data) {
  try {
    fs.writeFileSync(configPath, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error("Config write error:", err);
    return false;
  }
}

// GET /api/config
router.get('/', (req, res) => {
  const config = readConfig();
  res.json(config);
});

// POST /api/config (Update resume / settings)
router.post('/', (req, res) => {
  const { resumeUrl, resumePdfUrl, contactEmail } = req.body;
  const current = readConfig();

  const updated = {
    ...current,
    resumeUrl: resumeUrl || current.resumeUrl,
    resumePdfUrl: resumePdfUrl || current.resumePdfUrl,
    contactEmail: contactEmail || current.contactEmail,
  };

  if (saveConfig(updated)) {
    res.json({ success: true, config: updated, message: "Configuration updated successfully." });
  } else {
    res.status(500).json({ error: "Failed to save configuration." });
  }
});

export default router;
