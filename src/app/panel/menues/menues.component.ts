import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/api/user.service';

@Component({
  selector: 'app-menues',
  templateUrl: './menues.component.html',
  styleUrls: ['./menues.component.css']
})
export class MenuesComponent implements OnInit {

  constructor(public userService: UserService) { }

  ngOnInit() {
  }

  logout() {
    this.userService.logout();
  }

}
