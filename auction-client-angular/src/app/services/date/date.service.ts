import { Injectable } from '@angular/core';

/**
 * Service to to formatting Date strings
 */
@Injectable()
export class DateService {

  constructor() { }

  getDateTime(days?: number) {
    const currentDate = new Date();
    if (days) {
      currentDate.setDate(currentDate.getDate() + days);
    }
    return this.currentDateToString(currentDate);
  }

  private currentDateToString(date) {
    let dd = date.getDate();
    if (dd < 10) {
      dd = '0' + dd;
    }

    let mm = date.getMonth() + 1;
    if (mm < 10) {
      mm = '0' + mm;
    }

    let yy = date.getFullYear();
    if (yy < 10) {
      yy = '0' + yy;
    }

    const hh = date.getHours();

    let min = date.getMinutes();
    if (min < 10) {
      min = '0' + min;
    }

    return dd + '.' + mm + '.' + yy + ' ' + hh + ':' + min;
  }

}
