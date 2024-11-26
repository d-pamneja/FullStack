import { Strategy, Profile } from 'passport-google-oauth20';
import { UserModel } from '../db/model';
import passport from 'passport';
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'; 
dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET!;


passport.use(
    new Strategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID || '',
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
        callbackURL: process.env.CALLBACK_URL || '',
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
            let user = await UserModel.findOne({ username: profile.displayName });

            if (!user) {
              const hashedPassword = await bcrypt.hash('GOOGLE_PASSWORD',5)
              user = new UserModel({
                  username: profile.displayName,
                  password: hashedPassword
              });
              await user.save();
            }
    
            return done(null, user );

          } catch (error) {
            return done(error, null!);
          }
        }
    )
  );


  passport.serializeUser((user: any, done) => {
    done(null, user);
  });
  
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await UserModel.findById(id);
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  });
  
  

  
  
