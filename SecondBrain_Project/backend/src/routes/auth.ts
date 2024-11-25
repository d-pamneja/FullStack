import  { Router,Request, Response, NextFunction } from 'express';
import passport from 'passport';
import { logout } from '../controllers/user';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'; 
dotenv.config()
const JWT_SECRET = process.env.JWT_SECRET
import { COOKIE_NAME } from "../utils/constants"

const googleRouter = Router();

googleRouter.get(
  '/google',
  passport.authenticate('google', { scope: ['profile'] })
);

googleRouter.get(
    '/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    async (req: Request, res: Response) => {
      try {
        const user = req.user as any;
        if (!user) {
            res.status(401).json({ message: 'User not authenticated.' });
            return;
        }

        const token = jwt.sign({
            Id : user._id.toString()
        },JWT_SECRET as any)

        const oldToken = req.signedCookies[`${COOKIE_NAME}`]; 
        if (oldToken) {
            res.clearCookie(COOKIE_NAME);
        }
    
        const expiresInMilliseconds = 7 * 24 * 60 * 60 * 1000; 
        const expires = new Date(Date.now() + expiresInMilliseconds);

        res.cookie(COOKIE_NAME, token, {
            path: "/",
            domain: "localhost",
            expires,
            httpOnly: true,
            signed: true,
            secure : true
        });
  
        res.redirect('http://localhost:5173/home');
      } catch (error) {
        console.error('Google callback error:', error);
        res.status(500).json({ message: 'Internal server error.' });
      }
    }
  );
  

googleRouter.get('/logout', logout);

export default googleRouter;