import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PageRoutingModule } from './page-routing.module';
import { HomeComponent } from './home/home.component';
import { EventListComponent } from './event-list/event-list.component';
import { EventDetailsComponent } from './event-list/event-detail/event-detail.component';
import { EditEventComponent } from './edit-event/edit-event.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({ 
  declarations: [
    HomeComponent,
    EventListComponent,
    EventDetailsComponent,
    EditEventComponent,
    
  ],
  imports: [
    CommonModule,
    PageRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class PageModule { }
