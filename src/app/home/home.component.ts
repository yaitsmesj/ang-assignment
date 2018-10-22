import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { UserService } from "../shared";

@Component({
    selector: 'home-page',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent {
    constructor(
        private router: Router,
        private userService: UserService
    ) {}

    isAuthenticated: boolean;
    
    ngOnInit() {
        this.userService.isAuthenticated.subscribe(
            (authenticated) => {
                this.isAuthenticated = authenticated;

                if(authenticated) {
                    this.setListTo('feed');
                } else {
                    this.setListTo('all');
                }
            }
        );
    }

    setListTo(type: string = '', filters: Object = {}) {
        if (type === 'feed' && !this.isAuthenticated) {
            this.router.navigateByUrl('/login');
            return;
        }

        // this.listConfig = {type: type, filters: filters};
    }
}
