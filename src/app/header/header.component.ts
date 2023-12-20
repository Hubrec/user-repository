import {Component, Input} from '@angular/core';
import {Location} from "@angular/common";
import {Router} from "@angular/router";
import {UsersService} from "../../services/users.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  title = 'User repository';

  @Input()
  subtitle: string = '';

  constructor(private readonly location: Location,
              private readonly router: Router,
              private readonly userService: UsersService) {
  }

  public goBack() {
    this.location.back();
  }

  public redirectHome() {
    this.router.navigate(['index']);
  }

  public saveChanges() {
    this.userService.saveOnBrowser();
  }
}
