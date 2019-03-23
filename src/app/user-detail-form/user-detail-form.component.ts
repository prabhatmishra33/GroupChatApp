import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-user-detail-form',
  templateUrl: './user-detail-form.component.html',
  styles: []
})
export class UserDetailFormComponent implements OnInit {
  userDetailsForm:FormGroup;
  loader;
  constructor(private _fb:FormBuilder, private _chatService:ChatService) {

  }


  ngOnInit() {
    this._createForm();
  }

  _createForm(){
    this.userDetailsForm = this._fb.group({
      displayName : ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    })
  }

  /*
  * User joins the group on this submit button
  */

  onFormSubmit(){
    const param = this.userDetailsForm.value;
    this._chatService.join(param)
      .subscribe((resp) => {
        this.loader = false;
      },
      (error) => {
        console.error(error);
        this.loader = false;
      });
  }
}
