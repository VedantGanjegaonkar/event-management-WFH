import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from 'src/app/core/services/event.services';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailsComponent implements OnInit {
  event: any;
  userId:string=''

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eventService: EventService,
    private userSerive:UserService
  ) { }

  setUserId(){
    this.userId=this.userSerive.getUserIdFromToken()
    
  }

  ngOnInit(): void {
    const eventId = this.route.snapshot.paramMap.get('id');
    if (eventId) {
      this.loadEventDetails(eventId);
    }
    this.setUserId()
    
    
  }

  loadEventDetails(eventId: string): void {
    this.eventService.getEventById(eventId).subscribe(data => {
      this.event = data;
    });

    
  }

  deleteEvent(): void {
    if (confirm('Are you sure you want to delete this event?')) {
      this.eventService.deleteEvent(this.event._id).subscribe(() => {
        alert('Event deleted successfully');
        this.router.navigate(['/home']);
      });
    }
  }

  editEvent(): void {
    // Navigate to an edit event form, implementation needed
    this.router.navigate(['/edit-event', this.event._id]);
  }
}
