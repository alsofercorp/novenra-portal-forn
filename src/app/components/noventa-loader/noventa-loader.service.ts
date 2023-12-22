import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NoventaLoaderService {
  
  isLoading: EventEmitter<boolean> = new EventEmitter();
  loadMessage: EventEmitter<string> = new EventEmitter();

  constructor() { }

  show(loadMessage: string | null = null) {
    
    if (loadMessage) {
      this.loadMessage.emit(loadMessage);
    } else {
      this.loadMessage.emit('');
    }

    this.isLoading.emit(true);
  }

  hidde() {
    this.isLoading.emit(false);
  }
}
