import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs'
import { LocalFactory } from './util.service';
import { IUser } from '../interfaces/user';
import { localstorageName } from '../constants/config';
import { catchError, tap, map } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { STATUS_CODE, IHttpResponse } from './../interfaces/httpResponse'
import { apiEndPoints } from './../constants/api.config'
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  public getUserInfo(): IUser {
    return LocalFactory.getItem(localstorageName.userInfo, true) as IUser;
  }

  public loginUser(username: string, password: string) {
    // const url = `${cloundEndpoints.user}/login`;
    // try {
    //   return this.httpClient.post(url, { username, password }).pipe(
    //     map(data => data as IHttpResponseModel),
    //     map(res => {
    //       if (res.status === STATUS_CODE.SUCCESS) {
    //         const userInfo = res.data;
    //         LocalFactory.setItem(localstorageName.userInfo, userInfo);
    //         return userInfo;
    //       }
    //       if (res.message) {
    //         alert(res.message);
    //       }
    //       return null;
    //     }),
    //   );
    // } catch (error) {
    //   return of(error);
    // }
  }


  public getToken(): string {
    const user = this.getUserInfo();
    if (user && user.token && user.token.value) {
      return user.token.value;
    }
    return '';
  }

  public logOut(): void {
    LocalFactory.setItem(localstorageName.userInfo, null);
    this.router.navigate(['/login']);
  }
}
