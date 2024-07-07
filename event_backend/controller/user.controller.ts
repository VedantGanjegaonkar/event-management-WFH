import { NextFunction, Request, Response } from 'express';
import { AuthService } from '../services.ts/auth.services';
import { errorHandler } from '../middleware/errorHandler';

const authService = new AuthService();

export class AuthController {

  async register(req: Request, res: Response,next:NextFunction): Promise<void> {
    try {
      const user = await authService.register(req.body);
      res.status(201).json(user);
    } catch (error:any) {
        errorHandler(error,req,res,next)
    }
  }

  public async login(req: Request, res: Response, next:NextFunction): Promise<void> {
    try {
        const { email, password } = req.body;

        const user = await authService.findUserByEmail(email);
      
        await authService.validatePassword(password, user.password);
        
        const token = authService.generateAuthToken(user._id.toString(), user.role,user.email);
        console.log(token)

        res.status(200).json({ message: 'Login successful', token });
    } catch (err: any) {
        errorHandler(err,req,res,next)
    }
}

}