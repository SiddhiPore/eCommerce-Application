import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { cart, product, signUp } from '../data-type';
import { UserService } from '../services/user.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-user-auth',
  standalone: true,
  imports: [MatButtonModule,MatCardModule, FormsModule],
  templateUrl: './user-auth.component.html',
  styleUrl: './user-auth.component.css'
})
export class UserAuthComponent {
  constructor(private user:UserService, private product:ProductService){}
signUp(data:signUp):void
  {
  this.user.userSignup(data);
  }
  
  ngOnInit(){
    this.user.reloadSeller();
  }
 
 login(data:signUp):void
  {
   this.user.userLogin(data);
   this.user.loginError.subscribe((isError)=>{
 if(isError)
 {
   alert("Invalid email or password")
 }
 else
 {
  this.localCartToRemoteCart();
 }
 
   })
     
  }
 
  loginCheck:boolean = false;
  openLogin()
  {
   this.loginCheck = !this.loginCheck;
  }
  openSignup()
 {
 this.loginCheck =  !this.loginCheck;
 }
 
 
  localCartToRemoteCart() {
    let data = localStorage.getItem('localCart');
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id
    if (data) {
      let cartDataList: product[] = JSON.parse(data);
      cartDataList.forEach((product: product, index) => {

        let cartData: cart = {
          ...product,
          productId: product.id,
          userId
        };
        delete cartData.id
        setTimeout(() => {
          this.product.toCart(cartData).subscribe((result) => {
            if (result) {
              console.warn("Item Store in DB")
            }

          })

        }, 500);
        if (cartDataList.length === index + 1) {
          localStorage.removeItem('localCart')
        }

      })
    }
    setTimeout(() => {
      this.product.getCartList(userId);
    }, 2000);


  }

}
