import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from 'src/app/core/services/event.services';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {
  events: any[] = [];
  userId:string=''

  constructor(private eventService: EventService, private router: Router,private userService:UserService) { }

  ngOnInit(): void {
    this.loadEvents();

  }

  loadEvents(): void {
    this.eventService.getAllEvents().subscribe(data => {
      this.events = data;
    });
  }

  registerForEvent(eventId: string): void {
    this.eventService.registerForEvent(eventId).subscribe(() => {
      alert('Registered successfully');
    });
  }
  logout() {
    this.userService.logout();
    this.router.navigate(['/login']);
  }

  viewEventDetails(eventId: string): void {
    this.router.navigate(['/events', eventId]);
  }
}
