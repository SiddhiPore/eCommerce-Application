import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { cart, product } from '../data-type';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [MatCardModule, MatDividerModule, MatButtonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
  
})
export class ProductDetailsComponent {
  productData: undefined | product;
  productQuantity : number=1
  removeCart = false
  cartData : undefined| product
  
constructor(private activeRout: ActivatedRoute, private product: ProductService){}
ngOnInit() : void{

  let productId =this.activeRout.snapshot.paramMap.get('productId');
  console.warn(productId);
  productId && this.product.getProduct(productId).subscribe((result)=>{
    console.warn(result)
    this.productData=result ;

    let cartData = localStorage.getItem('localCart');
    if (productId && cartData) {
      let items = JSON.parse(cartData);
      items = items.filter((items: product) => productId == items.id.toString())
      if (items.length) {
        this.removeCart = true;
      }
      else {
        this.removeCart = false
      }
    }

    let user = localStorage.getItem('user');

    if (user) {
      let userId = user && JSON.parse(user).id;
      this.product.getCartList(userId)
      this.product.cartData.subscribe((result) => {
        let item = result.filter((item: product) => productId?.toString() === item.productId?.toString())
        if (item.length) {
          this.cartData = item[0]
          this.removeCart = true
        }
      })
    }
  })

}

  handleQuality(val: string) {
    if (this.productQuantity < 20 && val === 'plus') {
      this.productQuantity += 1
    }
    else if (this.productQuantity > 1 && val === 'min') {
      this.productQuantity -= 1
    }
  }

  addtoCart() {
    if (this.productData) {
      this.productData.quantity = this.productQuantity;
      if (!localStorage.getItem('user')) {
        this.product.localAddToCart(this.productData);
        console.warn(this.productData)
        this.removeCart = true;

      }
      else {
        console.warn("User is loged in");
        let user = localStorage.getItem('user');
        console.warn(user)
        let userId = user && JSON.parse(user).id;
        console.warn(userId)


        let carData: cart = {
          ...this.productData,
          userId,
          productId: this.productData.id
        }
        console.warn(carData)

        delete carData.id
        this.product.toCart(carData).subscribe((result) => {
          if (result) {
            this.product.getCartList(userId);
            this.removeCart = true
          }
        })
      }

    }
  }
  removetoCart(productId: number) {
    if (!localStorage.getItem('user')) {
      this.product.removeitemFromCart(productId)

    }
    else {
      let user = localStorage.getItem('user');
      let userId = user && JSON.parse(user).id;
      console.warn(this.cartData)
      this.cartData && this.product.removeToCart(this.cartData.id).subscribe((result) => {
        if (result) {
          this.product.getCartList(userId)
        }
      })
      this.removeCart = false;
    }
  }

}
