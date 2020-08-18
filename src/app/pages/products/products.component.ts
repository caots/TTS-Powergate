import { Component, OnInit, OnDestroy, OnChanges, SimpleChanges, AfterViewInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { ProductsService } from '../../services/products.service'
import { Product } from '../../interfaces/product'
import { fromEvent } from 'rxjs';
import { filter, debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



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
  suggestedProduct: Product[] = [];
  checkChangeData: boolean = false;

  // form data
  changeData: FormGroup;
  submitted = false;

  @ViewChild('input') input: ElementRef;

  constructor(
    private productService: ProductsService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getAllProduct();
    this.initForm()
  }

  initForm() {
    this.changeData = this.formBuilder.group({
      name: ['', [Validators.required]],
      price: ['', [Validators.required]],
    });
  }

  get f() { return this.changeData.controls; }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.changeData.invalid) {
      return;
    } else {
      
      if (this.checkChangeData) {
        this.onCreateProduct();
      } else {
        this.onEditProduct();
      }
      document.getElementById("hidden-modal").click(); 
    }

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

  onCreateProduct() {
    this.product.id = this.checkId;
    console.log(this.product);
    this.subscribe = this.productService.createProduct(this.product).subscribe(
      data => {
        this.product = data;
        this.listProduct.push(data)
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
    if (id == -1) {
      this.checkChangeData = true
      this.checkId = this.listProduct[this.listProduct.length - 1].id + 1;
      this.product = {
        id: 0
      }
    } else {
      this.checkChangeData = false
      this.checkId = id;
      this.getProductById(id);
    }

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
