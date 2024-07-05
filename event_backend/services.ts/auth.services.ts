import { IUser,User } from '../model/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {NotFoundError, ValidationError, UnauthorizedError } from '../utils/error';

export class AuthService {

  async register(userData: IUser) {
    const { username, email, role,password } = userData;

    const existingUser = await User.findOne({ email });
            if (existingUser) {
                throw new ValidationError('Email is already registered');
            }
    
    const hashedPassword = await bcrypt.hash(password, 10);


    const user = new User({ username, email, password:hashedPassword, role});

    await user.save();
    return user;
  }

  public async findUserByEmail(email: string) {
    const user = await User.findOne({ email });
    if (!user) {
        throw new NotFoundError('Email not found');
    }
    return user;
}

public async validatePassword(password: string, hashedPassword: string) {
    const isPasswordValid = await bcrypt.compare(password, hashedPassword);
    if (!isPasswordValid) {
        throw new UnauthorizedError('Invalid password');
    }
    return isPasswordValid;
}

public  generateAuthToken(userId: string, role: string,email:string): string {
    return jwt.sign({ userId, role,email }, 'secret', { expiresIn: '100h' });
    
}
public async getUserId(authHeader:string|undefined):Promise<string>{

    if (!authHeader) {
        throw new NotFoundError("header not found here")
       
    }

    const user =   jwt.verify(authHeader, 'secret') as { userId: string; role: string; email:string; iat: number; exp: number; };
    if (!user) {
        throw new NotFoundError("user not found (FORBIDEN)")
    }

    const userID = user.userId
    return userID

}
}