import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styles: [
  ]
})

export class LoginPageComponent {

  constructor(
    private authService: AuthService,
    private router: Router
     ) {}

  onLogin(): void {
    //esto es un observable, para que se dispare hay que llamar el subscribe.
    this.authService.login( 'ali@gmail.com', '123456')
      .subscribe( user => {
        this.router.navigate(['/']);


      });


  }

}
