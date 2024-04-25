import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  searchText: any;
  searchPrice: any;
  searchLocation: any;
  events: any[] = [];
  drpPrice: string[] = [];
  drpLocation: string[] = [];
  distinctPrice: string[] = [];
  distinctLocation: string[] = [];

  bookingObj: any = {
    "BookingId": 0,
    "UserId": 0,
    "EventId": 0,
    "NoOfTickets": 0,
    "EventBookingMembers": [

    ]
  }
  eventMembers: any = {
    "BookingMemberId": 0,
    "BookingId": 0,
    "Name": "",
    "Age": 0,
    "IdentityCard": "",
    "CardNo": "",
    "ContactNo": ""
  }

  constructor(private http: HttpClient) {
    const localData = localStorage.getItem('eventUser');
    if (localData != null) {
      const user = JSON.parse(localData);
      this.bookingObj.UserId = user.userid;
    }
  }

  ngOnInit(): void {
    this.loadAllEvent();
  }

  addMember() {

    const obj = JSON.stringify(this.eventMembers);
    this.eventMembers = {
      "BookingMemberId": 0,
      "BookingId": 0,
      "Name": "",
      "Age": 0,
      "IdentityCard": "",
      "CardNo": "",
      "ContactNo": ""
    }
    this.bookingObj.EventBookingMembers.push(JSON.parse(obj));
  }

  loadAllEvent() {
    this.http.get('https://freeapi.gerasim.in/api/EventBooking/GetAllEvents').subscribe((res: any) => {
      this.events = res.data;
      this.events.forEach(x => {
        this.drpLocation.push(x.location);
        this.drpPrice.push(x.price);
      })
      this.distinctLocation = this.drpLocation.map(item => item.toLowerCase()).filter((value, index, self) => self.indexOf(value) === index);
      this.distinctPrice = this.drpPrice.map(item => item).filter((value, index, self) => self.indexOf(value) === index);
    });



    this.searchPrice = -1;
    this.searchLocation = "-1";
  }
  // Function to get distinct values from a list
  getDistinctValues(inputList: any[]): any[] {
    return inputList.filter((value, index, self) => self.indexOf(value) === index);
  }



  bookNow(event: any) {

    this.bookingObj.EventId = event.eventId;
    const model = document.getElementById('bookingModal');
    if (model != null) {
      model.style.display = 'block'
    }
  }

  closeModal() {
    const model = document.getElementById('bookingModal');
    if (model != null) {
      model.style.display = 'none'
    }
  }

  makeBooking() {
    this.bookingObj.NoOfTickets = this.bookingObj.EventBookingMembers.length;
    this.http.post('https://freeapi.gerasim.in/api/EventBooking/BookEvent', this.bookingObj).subscribe((res: any) => {
      if (res.result) {
        alert('booking success');
        this.closeModal();
      } else {
        alert('alert.message')
      }
    })
  }

  onPriceChange(event: any) {
    var price = event.target.value;
    this.events = this.events.filter(x => x.price < price);
  }
}
