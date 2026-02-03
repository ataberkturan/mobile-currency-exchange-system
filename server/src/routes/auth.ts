import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../db';
import { generateToken } from '../middleware/auth';

const router = Router();

router.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Name, email, and password are required' });
  }
  
  if (db.getUserByEmail(email)) {
    return res.status(400).json({ message: 'Email already registered' });
  }
  
  const user = {
    id: uuidv4(),
    email,
    name,
    passwordHash: password,
  };
  
  db.createUser(user);
  const token = generateToken(user.id);
  
  res.json({
    id: user.id,
    email: user.email,
    name: user.name,
    token,
  });
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }
  
  const user = db.getUserByEmail(email);
  
  if (!user || user.passwordHash !== password) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }
  
  const token = generateToken(user.id);
  
  res.json({
    id: user.id,
    email: user.email,
    name: user.name,
    token,
  });
});

router.post('/logout', (req, res) => {
  res.status(204).send();
});

router.get('/me', (req, res) => {
  res.json({ authenticated: true });
});

export { router as authRouter };
