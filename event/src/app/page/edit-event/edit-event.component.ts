import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventService } from 'src/app/core/services/event.services';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css']
})
export class EditEventComponent implements OnInit {
  eventForm: FormGroup;
  eventId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private eventService: EventService
  ) {
    this.eventForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      date: ['', Validators.required],
      location: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.eventId = this.route.snapshot.paramMap.get('id');
    if (this.eventId) {
      this.loadEventDetails(this.eventId);
    }
  }

  loadEventDetails(eventId: string): void {
    this.eventService.getEventById(eventId).subscribe(data => {
      this.eventForm.patchValue(data);
    });
  }

  onSubmit(): void {
    if (this.eventForm.valid) {
      if (this.eventId) {
        this.eventService.updateEvent(this.eventId, this.eventForm.value).subscribe(() => {
          alert('Event updated successfully');
          this.router.navigate(['/events', this.eventId]);
        });
      } else {
        this.eventService.createEvent(this.eventForm.value).subscribe(() => {
          alert('Event created successfully');
          this.router.navigate(['/home']);
        });
      }
    }
  }
}
