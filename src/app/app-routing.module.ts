import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MyBookingsComponent } from './pages/my-bookings/my-bookings.component';
import { NewEventComponent } from './pages/new-event/new-event.component';
import { EventBookingsComponent } from './pages/event-bookings/event-bookings.component';
import { EventListComponent } from './pages/event-list/event-list.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'my-bookings',
    component: MyBookingsComponent,
  },
  {
    path: 'new-event',
    component: NewEventComponent,
  },
  {
    path: 'event-bookings',
    component: EventBookingsComponent,
  },
  {
    path: 'event-list',
    component: EventListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
