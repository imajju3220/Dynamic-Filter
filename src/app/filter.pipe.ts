import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, searchText: string, searchPrice: number, searchLocation: string): any {
    if (!value || !value.length) {
      return null;
    }

    let filteredEvents = value;

    // Filter by organizer name
    if (searchText) {
      filteredEvents = filteredEvents.filter((event: any) =>
        event.organizerName.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    // Filter by price
    if (searchPrice != -1) {
      if (searchPrice) {
        filteredEvents = filteredEvents.filter((event: any) =>
          event.price == searchPrice
        );
      }
    }

    if (filteredEvents.length === 0) {
      alert('No result found');
    }

    //Filter by location
    if (searchLocation != "-1") {
      filteredEvents = filteredEvents.filter((event: any) =>
        event.location.toLowerCase().includes(searchLocation.toLowerCase())
      );
    }

    return filteredEvents;
  }

}
