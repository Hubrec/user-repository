import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {OCCUPATIONS, UsersService} from "../../../services/users.service";
import {User} from "../../../services/user";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent {
  subtitle = 'New user';

  form: FormGroup;

  constructor(private readonly fb: FormBuilder,
              private readonly userService: UsersService,
              private readonly router: Router) {
    this.form = this.fb.group({
      name: [null, Validators.required],
      occupation:  [null, Validators.required],
      email: [null, Validators.required],
      bio: [null, Validators.max(500)],
    });
  }

  protected readonly OCCUPATIONS = OCCUPATIONS;

  public onSubmit() {
    const user = new User(
      this.userService.getUniqueId(), this.form.value['name'],  this.form.value['occupation'], this.form.value['email'],  this.form.value['bio']
    );
    this.userService.addUser(user);
    this.router.navigate(['/']);
  }
}
