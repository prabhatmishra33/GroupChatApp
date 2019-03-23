

import { Component, OnInit } from '@angular/core';
import { Ichat } from '../interfaces/ichat';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  chats : Ichat[] = [];
  message : string;
  sending : boolean;

  constructor(private _chatService : ChatService) { }

  ngOnInit() {

    this._chatService.getChannel().bind('chat',data =>{
      console.log(data);
      if(data.email === this._chatService.user.email) data.isMe = true;
      this.chats.push(data);
    })

    //console.log(this._chatService.getChannel().bind('chat'));

  }

  sendMessage(message:string){
    this.sending = true;
    this._chatService.sendMessage(message)
      .subscribe(resp => {
        this.message = undefined;
        this.sending = false;
      }, err => {
        this.sending = false;
      });
  }

}
