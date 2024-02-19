// src/middleware/auth.ts

import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

interface JwtPayload {
  id: string; // The id of the user
}

interface RequestWithUser extends Request {
  userId?: string; // Add the userId to the Request object
}

function verifyToken(req: RequestWithUser, res: Response, next: NextFunction) {
  const token = req.headers['authorization']?.split(' ')[1]; // Extract the token from the Authorization header
  if (!token) {
    return res.status(401).json({ error: 'Access Denied. No token provided.' });
  }

  try {
    const secretKey = process.env.SECRET_KEY || 'chinmay-secret'; 
    const decoded = jwt.verify(token, secretKey) as JwtPayload;
    req.userId = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid Token.' });
  }
}

export default verifyToken;
