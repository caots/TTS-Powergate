import { Component, OnInit, OnDestroy, OnChanges, SimpleChanges, AfterViewInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { ProductsService } from './../../services/products.service'
import { Product } from '../../interfaces/product'
import { fromEvent } from 'rxjs';
import { filter, debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';


import { Subscription } from 'rxjs'

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy, AfterViewInit {

  product: Product = {
    id: 0
  };
  listProduct: Product[] = [];
  checkId: number
  subscribe: Subscription;
  suggestedProduct: Product[] = []

  @ViewChild('input') input: ElementRef;

  constructor(
    private productService: ProductsService
  ) { }

  ngOnInit(): void {
    this.getAllProduct();
  }

  getAllProduct() {
    this.subscribe = this.productService.getAllProducts().subscribe(
      data => {
        this.listProduct = data
        this.suggestedProduct = data;
      },
      err => {
        this.productService.handlerError(err);
      }
    )
  }

  ngAfterViewInit() {
    this.getAllProduct()
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        filter(Boolean),
        debounceTime(150),
        distinctUntilChanged(),
        tap((text) => {
          this.suggestedProduct = []
          let txtSearch = this.input.nativeElement.value;
          this.listProduct.forEach(data => {
            if (data.name.search(txtSearch) >= 0) {
              this.suggestedProduct.push(data);              
            }
          })          
        })
      )
      .subscribe();
  }

  getProductById(id: number) {
    this.subscribe = this.productService.getProductById(id).subscribe(
      data => {
        this.product = data;
      },
      err => {
        this.productService.handlerError(err);
      }
    )
  }

  onEditProduct() {
    this.subscribe = this.productService.updateProduct(this.product).subscribe(
      data => {
        let index = this.getIndex(data.id)
        this.listProduct[index] = data
      },
      err => {
        this.productService.handlerError(err);
      }
    )
  }

  onDeleteProduct() {
    this.subscribe = this.productService.deleteProduct(this.checkId).subscribe(
      data => {
        let index = this.getIndex(data.id)
        this.listProduct.slice(index, 1);
        this.getAllProduct();
      },
      err => {
        this.productService.handlerError(err);
      }
    )
  }

  onCheckProductId(id) {
    this.checkId = id;
    this.getProductById(id);
  }

  getIndex(id: number) {
    let rs = 0;
    this.listProduct.forEach((product, index) => {
      if (product.id == id) rs = index
    })
    return rs;
  }

  ngOnDestroy() {
    if (this.subscribe) {
      this.subscribe.unsubscribe();
    }
  }
}
