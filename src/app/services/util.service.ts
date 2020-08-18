import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalFactory {
  static getItem(key: string, needParse?: boolean) {
    try {
      return needParse ? JSON.parse(localStorage.getItem(key)) : localStorage.getItem(key);
    } catch (error) {
      return null;
    }
  }
  static setItem(key: string, value: object | string) {
    return localStorage.setItem(key, typeof value === 'object' ? JSON.stringify(value) : value);
  }
  static removeItem(key: string) {
    return localStorage.removeItem(key);
  }
}
