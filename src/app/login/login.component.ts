import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';
import { AlertService } from '../services/alert.service';

@Component({
    templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit {

    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;

    pageTitle = 'LASSO Login';

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService
    ) {
        if (this.authenticationService.currentUserData) {
            this.router.navigate(['/lsleditor']);
        }
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: [''],
            password: [''],
        });

        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;

        if(this.loginForm.invalid) { return; }


        this.loading = true;
        this.authenticationService.login(this.f.username.value, this.f.password.value).pipe(first()).subscribe(
        data => {
            this.router.navigate([this.returnUrl]);
        },
        error => {
            this.alertService.error(error);
            this.loading = false;
        }
    )
    }

}
