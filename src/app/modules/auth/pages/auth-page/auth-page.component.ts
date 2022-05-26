import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.css']
})
export class AuthPageComponent implements OnInit {

  formLogin: FormGroup = new FormGroup({});

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.formLogin = new FormGroup({
      usuario: new FormControl('', [
        Validators.required
      ]),
      password: new FormControl('',[
        Validators.required
      ])
    });
  }

  login(): void {
    const { usuario, password } = this.formLogin.value;
    if(usuario == 'ADMIN' && password == '12345') {
      this.router.navigate(['/']);
    }
  }

}
