import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Router } from "@angular/router";
import { UserService, ProfileService } from "../services";
import { concatMap, tap } from "rxjs/operators";
import { of } from "rxjs";
import { Profile } from "../models";

@Component({
    selector: 'app-follow-button',
    templateUrl: './follow-button.component.html'
})
export class FollowButtonComponent {
    constructor(
        private profileService: ProfileService,
        private router: Router,
        private userService: UserService
    ) {}

    @Input() profile: Profile;
    @Output() toggle = new EventEmitter<boolean>();
    isSubmitting = false;

    toggleFollowing() {
        this.isSubmitting = true;

        this.userService.isAuthenticated.pipe(concatMap(
            (authenticated) => {
                if(!authenticated) {
                    this.router.navigateByUrl('/login');
                    return of(null);
                }

                if(!this.profile.following) {
                    return this.profileService.follow(this.profile.username)
                        .pipe(tap(
                            data => {
                                this.isSubmitting = false;
                                this.toggle.emit(true);
                            },
                            err => this.isSubmitting = false
                        ));
                } else {
                    return this.profileService.unfollow(this.profile.username)
                        .pipe(tap(
                            data => {
                                this.isSubmitting = false;
                                this.toggle.emit(false);
                            },
                            err => this.isSubmitting = false
                        ));
                }
            }
        )).subscribe();
    }
}