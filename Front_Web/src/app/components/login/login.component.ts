import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css',
    '../../Content/user/css/maicons.css',
    '../../Content/user/css/bootstrap.css',
    '../../Content/user/vendor/owl-carousel/css/owl.carousel.css',
    '../../Content/user/vendor/animate/animate.css',
    '../../Content/user/css/theme.css']
})
export class LoginComponent implements OnInit {

  loginForm: any
  returnUrl: any
  loading = false
  submitted = false

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit(): void {
    // tạo formbuild vs đăng nhập và password
    // Validators.required để kiểm tra xem chúng có được điền vào không
    this.loginForm = this.formBuilder.group({
      UserName: ['', Validators.required],
      Password: ['', Validators.required]
      // UserName và Password phải trùng vs test trong postman và view trong django
    });


  }
  get loginFormControl() { return this.loginForm.controls; }
  //để dễ dàng truy cập đến các trường điều khiển của form, chưa rõ hoạt động

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    this.authService.login(this.loginForm.value).pipe(first()).subscribe(
      () => { this.router.navigate([returnUrl]) },
      // () => { this.router.navigateByUrl(returnUrl) },
      () => {
        this.loading = false;
        this.loginForm.reset();
        this.loginForm.setErrors({
          invalidLogin: true
        });
      }
    )
    console.log(this.loginForm.value)

  }
}
