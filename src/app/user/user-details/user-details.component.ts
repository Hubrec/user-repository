import {Component, OnInit} from '@angular/core';
import {User} from "../../../services/user";
import {UsersService} from "../../../services/users.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  subtitle = 'Details';

  user?: User;

  constructor(private readonly userService: UsersService,
              private readonly route: ActivatedRoute) {
  }

  ngOnInit() {
      this.user = this.userService.getUserById(
        parseInt(this.route.snapshot.paramMap.get("id") || "-1", 10)
      );
  }

}
