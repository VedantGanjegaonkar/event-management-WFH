import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventDetailsComponent } from './event-list/event-detail/event-detail.component';
import { EventListComponent } from './event-list/event-list.component';
import { EditEventComponent } from './edit-event/edit-event.component';
const routes: Routes = [
  { path: 'home', component: EventListComponent },
  { path: 'events/:id', component: EventDetailsComponent },
  { path: 'edit-event/:id', component: EditEventComponent },
  { path: 'create-event', component: EditEventComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageRoutingModule { }
