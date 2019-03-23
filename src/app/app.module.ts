import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { ChatService } from './services/chat.service';
import { PusherService } from './services/pusher.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserDetailFormComponent } from './user-detail-form/user-detail-form.component';
import { ChatComponent } from './chat/chat.component';

@NgModule({
  declarations: [
    AppComponent,
    UserDetailFormComponent,
    ChatComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ChatService, PusherService],
  bootstrap: [AppComponent]
})
export class AppModule { }
