import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  const validUser = process.env.ADMIN_USERNAME || 'ahtesham';
  const validPass = process.env.ADMIN_PASSWORD || 'admin123';

  if (username === validUser && password === validPass) {
    const token = jwt.sign(
      { username, role: 'admin' },
      process.env.JWT_SECRET || 'ahtesham_portfolio_jwt_secret_key_2026',
      { expiresIn: '24h' }
    );

    return res.json({
      success: true,
      token,
      user: { username, role: 'admin' }
    });
  }

  return res.status(401).json({ error: 'Invalid admin username or password' });
});

router.get('/verify', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ valid: false });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'ahtesham_portfolio_jwt_secret_key_2026');
    return res.json({ valid: true, user: decoded });
  } catch (err) {
    return res.status(401).json({ valid: false });
  }
});

export default router;
