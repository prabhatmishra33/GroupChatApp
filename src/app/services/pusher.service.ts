import { Injectable } from '@angular/core';
import * as Pusher from 'pusher-js';

@Injectable({
  providedIn: 'root'
})

export class PusherService {
  private _pusher:any;

  constructor() { 
    this._pusher = new Pusher('67050db431edeb71671a',{
      cluster: 'ap2',
      encrypted: true
    })
  }

  getPusher(){
    return this._pusher;
  }
}
