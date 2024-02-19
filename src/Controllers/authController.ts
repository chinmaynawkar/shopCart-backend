// src/controllers/authController.ts

import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from "../Models/user.model"


class AuthController {
    // Register a new user
    async register(req: Request, res: Response) {
    const { username, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ error: 'Username or email already exists' });
    }

    // Create a new user
    const user = new User({ username, email, password });
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  }
  // Login a user
  async login(req: Request, res: Response) {
    const { username, password } = req.body;

    // Find the user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Compare the provided password with the stored hash
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Generate a JWT token
    const secretKey = process.env.SECRET_KEY || 'chinmay-secret'; 
    const token = jwt.sign({ id: user._id }, secretKey, { expiresIn: '1h' }); // The token will expire in 1 hour

    // Return the token
    res.json({ token });
  }
}

export default new AuthController();
