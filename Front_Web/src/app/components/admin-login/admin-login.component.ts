import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AdminAuthService } from 'src/app/services/admin-auth.service';


@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css',
    '../../Content/user/css/maicons.css',
    '../../Content/user/css/bootstrap.css',
    '../../Content/user/vendor/owl-carousel/css/owl.carousel.css',
    '../../Content/user/vendor/animate/animate.css',
    '../../Content/user/css/theme.css',
  ]
})
export class AdminLoginComponent implements OnInit {

  loading = false;
  loginForm: any;
  submitted = false;
  returnUrl: any;

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AdminAuthService,) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      UserName: ['', Validators.required],
      Password: ['', Validators.required]
    });
  }
  get loginFormControl() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    this.authService.login(this.loginForm.value).subscribe(
      data => {
        this.router.navigate(['admin'])
      }
      

    )
  }   
}



