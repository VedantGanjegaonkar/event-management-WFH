import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {jwtDecode} from 'jwt-decode';
import { Observable } from 'rxjs';
import { IUser } from '../../../../../event_backend/model/user.model';
// import * as jwt from 'jsonwebtoken';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  register(user:IUser):Observable<IUser>{
    return this.http.post<IUser>(`${this.apiUrl}/user/register`,user);
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/user/login`, credentials);
  }

  isLoggedIn(): boolean {
    // Implement your logic to check if the user is logged in
    // For example, check if a token exists in local storage
    return !!localStorage.getItem('token');
  }

  isAdmin():boolean{
    const token = localStorage.getItem('token');
    if(!token){
      return false;
    }
    const decodedToken = jwtDecode<any>(token);
    return decodedToken.role === 'admin';
  }

  getUserIdFromToken(): string  {
    const token = localStorage.getItem('token');
    if (!token) {
      return "null";
    }

    try {
      const decodedToken = jwtDecode<any>(token);
      
      

      // Check if the token is expired
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp < currentTime) {
        // Token is expired
        localStorage.removeItem('jwt_token');
        return "null";
      }

      return decodedToken.userId;
    } catch (error) {
      console.error('Error decoding token', error);
      return "null";
    }
  }

  logout(): void {
    localStorage.removeItem('token');
  }


  updateUser(userId: number, user: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/users/`, user);
  }

  deleteUser(userId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/users/${userId}`);
  }
}


// put(`${this.apiUrl}/users/${userId}`, user);
