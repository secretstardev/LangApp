import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  public progressBarLoading = new EventEmitter();
  public hideNavBar = new EventEmitter();

  constructor() {
  }
}
