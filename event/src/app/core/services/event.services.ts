import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private baseUrl = 'http://localhost:3000'; // Update with your API base URL

  constructor(private http: HttpClient) { }

  getAllEvents(): Observable<any> {
    return this.http.get(`${this.baseUrl}/events`);
  }

  getEventById(eventId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/events/${eventId}`);
  }

  createEvent(eventData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/events`, eventData);
  }

  updateEvent(eventId: string, eventData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/events/${eventId}`, eventData);
  }

  deleteEvent(eventId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/events/${eventId}`);
  }

  registerForEvent(eventId: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/events/${eventId}/register`, {});
  }
}
