import { Injectable } from '@angular/core';
import {Product} from '../interfaces/product'
import {Observable, BehaviorSubject, of} from 'rxjs'
import { catchError, tap, map } from 'rxjs/operators';
import {HttpClient, HttpErrorResponse} from '@angular/common/http'
import {STATUS_CODE, IHttpResponse} from './../interfaces/httpResponse'
import {apiEndPoints} from './../constants/api.config'

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(
    private http : HttpClient
  ) { }

  //get all product
  getAllProducts() {
    let url = apiEndPoints.product;    
    try{
      return this.http.get(url).pipe(
        map(data => data as IHttpResponse),
        map(res => {
          return res;
          // if(res.status == STATUS_CODE.SUCCESS){
          //   return res.data;
          // }else{
          //   return null;
          // }
        })
      )
    }catch(err){
      return of(err)
    }
  }

  // getProductById
  getProductById(id: number){
    let url = `${apiEndPoints.product}/${id}`;   
    try{
      return this.http.get(url).pipe(
        map(data => data as IHttpResponse),
        map(res => {
          return res;
          // if(res.status == STATUS_CODE.SUCCESS){
          //   return res.data;
          // }else{
          //   return null;
          // }
        })
      )
    }catch(err){
      return of(err)
    } 
  }

  //create product

  createProduct(data){
    let url = `${apiEndPoints.product}`
    try{
      return this.http.post(url, data).pipe(
        map(res => {
          return res
        })
      )
    }catch(err){
      return of(err)
    }
  }


  // update product
  updateProduct(data){
    let url = `${apiEndPoints.product}/${data.id}`
    try{
      return this.http.put(url, data).pipe(
        map(res => {
          return res
        })
      )
    }catch(err){
      return of(err)
    }
  }

  //delete product
  deleteProduct(id: number){
    let url = `${apiEndPoints.product}/${id}`
    try{
      return this.http.delete(url).pipe(
        map(res => {
          return res
        })
      )
    }catch(err){
      return of(err)
    }
  }


  // Handler Error
  handlerError(err){
    if(err.error instanceof Error){
      console.log(`Client-error: ${err.error.message}`);
    }else{
      console.log(`Server-side-error: ${err.status} - ${err.error}`);
    }
  }
}
