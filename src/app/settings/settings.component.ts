import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { UserService, User } from "../shared";

@Component({
    selector: 'app-settings-page',
    templateUrl: './settings.component.html'
  })
  export class SettingsComponent implements OnInit {
    user: User = {} as User;
    settingsForm: FormGroup;
    errors: Object = {};
    isSubmitting = false;
  
    constructor(
      private router: Router,
      private userService: UserService,
      private fb: FormBuilder
    ) {
      this.settingsForm = this.fb.group({
        image: '',
        username: '',
        bio: '',
        email: '',
        password: ''
      });
    }
  
    ngOnInit() {
      console.log('setting on init');
      Object.assign(this.user, this.userService.getCurrentUser());
      this.settingsForm.patchValue(this.user);
    }
  
    logout() {
      this.userService.purgeAuth();
      this.router.navigateByUrl('/');
    }
  
    submitForm() {
      this.isSubmitting = true;
  
      this.updateUser(this.settingsForm.value);
  
      this.userService
      .update(this.user)
      .subscribe(
        updatedUser => this.router.navigateByUrl('/profile/' + updatedUser.username),
        err => {
          this.errors = err;
          this.isSubmitting = false;
        }
      );
    }
  
    updateUser(values: Object) {
      Object.assign(this.user, values);
    }
  
  }
  