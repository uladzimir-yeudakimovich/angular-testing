import { Component, OnInit } from '@angular/core';

import { UserService } from './user.service';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  welcome: string;
  data: string;

  constructor(private userService: UserService,
              private dataService: DataService) { }

  ngOnInit() {
    this.welcome = this.userService.isLoggedIn ?
      'Welcome, ' + this.userService.user.name : 'Please log in.';
    this.dataService.getDetales().then((data: string) => this.data = data);
  }

}
