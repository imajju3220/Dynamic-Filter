import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.css'],
})
export class NewEventComponent {
  eventObj: any = {
    EventId: 0,
    EventName: '',
    Description: '',
    Location: '',
    StartDate: '',
    StartTime: '',
    EndDate: '',
    EndTime: '',
    ImageUrl: '',
    Capacity: '',
    Price: 0,
    OrganizerId: 0,
    IsIdentityMandatory: true,
    IsCoupleEntryMandatory: true,
  };

  loggedUserData: any;

  constructor(private http: HttpClient) {
    const localData = localStorage.getItem('eventUser');
    if (localData != null) {
      this.loggedUserData = JSON.parse(localData);
      this.eventObj.OrganizerId = this.loggedUserData.userId;
    }
  }

  onCreateEvent() {
    this.http
      .post(
        'https://freeapi.gerasim.in/api/EventBooking/CreateEvent',
        this.eventObj
      )
      .subscribe((res: any) => {
        if (res.result) {
          alert('event created');
        } else {
          alert(res.data);
        }
      });
  }
}
