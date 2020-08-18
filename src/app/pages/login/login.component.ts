import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router'
import { IUserInfo } from './../../interfaces/user'
import { localstorageName } from '../../constants/config';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;
  submitted = false;
  user : IUserInfo 

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.initForm()
  }

  get f() { return this.formLogin.controls; }

  initForm() {
    this.formLogin = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  login() {
    this.submitted = true
    if (this.formLogin.invalid) {
      return;
    }

    let payLoad = {
      email: '',
      password : ''
    }
    payLoad.email = this.formLogin.get('email').value;
    payLoad.password = this.formLogin.get('password').value;    

    if (payLoad.email !== '' && payLoad.password !== '') {
      localStorage.setItem(localstorageName.userInfo, JSON.stringify(payLoad))      
      this.router.navigateByUrl('pages')
    } 
  }

}
