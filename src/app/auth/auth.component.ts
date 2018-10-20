import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Errors, UserService } from "../shared";

@Component({
    selector: 'app-auth-page',
    templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit {
    authType: String = '';
    title: String = '';
    isSubmitting: Boolean = false;
    authForm: FormGroup;
    errors: Errors = new Errors();

    constructor(
        private route: ActivatedRoute,
        private fb: FormBuilder,
        private router: Router,
        private userService: UserService
    ) {
        this.authForm = this.fb.group({
            'email': ['', Validators.required ],
            'password': ['', Validators.required]
        });
    }
    ngOnInit() {
        this.route.url.subscribe(data => {
            this.authType = data[data.length - 1].path;
            this.title = (this.authType === 'login') ? 'Sign In' : 'Sign Up';
            if (this.authType === 'register') {
                this.authForm.addControl('username', new FormControl('', Validators.required));
            }
        });
    }

    submitForm() {
        this.isSubmitting = true;
        this.errors = new Errors();
        const credentials = this.authForm.value;
        this.userService.attemptAuth(this.authType, credentials)
        .subscribe(
            data => this.router.navigateByUrl('/'),
            err => {
                this.errors = err;
                this.isSubmitting = false;
            }
        );
    }
}
