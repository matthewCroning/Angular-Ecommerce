import { AuthService, LoginData } from './../../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginData: LoginData = {
    username: '',
    password: ''
  }

  public errors: any = [];

  public notifyMessage: string = "";

  constructor(private route: ActivatedRoute,
              private router: Router,
              private AuthService: AuthService) {}

  ngOnInit() {
    this.loginData.username = this.route.snapshot.paramMap.get('email')!
  }

  login(): void {
    console.log(this.loginData);
    this.AuthService.login(this.loginData).subscribe((data) => {
      this.router.navigate(['/']);
    }, (invalidResponse: any) => {
      this.errors = invalidResponse.error.errors;
    })
  }

}
