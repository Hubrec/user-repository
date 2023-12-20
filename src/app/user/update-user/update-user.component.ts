import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {OCCUPATIONS, UsersService} from "../../../services/users.service";
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../../../services/user";

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent {
  subtitle = 'Update user';

  form: FormGroup;
  user?: User;

  constructor(private readonly fb: FormBuilder,
              private readonly userService: UsersService,
              private readonly router: Router,
              private readonly route: ActivatedRoute) {

    this.user = this.userService.getUserById(
      parseInt(this.route.snapshot.paramMap.get("id") || "-1", 10)
    );

    this.form = this.fb.group({
      name: [this.user?.name, Validators.required],
      occupation: [this.user?.occupation, Validators.required],
      email: [this.user?.email, Validators.required],
      bio: [this.user?.bio, Validators.max(500)],
    });
  }

  protected readonly OCCUPATIONS = OCCUPATIONS;

  public onSubmit() {
    if (this.user) {
      this.userService.deleteUser(this.user.id)
      const user = new User(
        this.user.id, this.form.value['name'],  this.form.value['occupation'], this.form.value['email'],  this.form.value['bio']
      );
      this.userService.addUser(user);
      this.router.navigate(['/']);
    }
  }

}
