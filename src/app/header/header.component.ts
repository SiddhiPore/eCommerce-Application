import { Component, OnInit } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { RouterLink, RouterOutlet } from '@angular/router';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router'
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatButtonModule,MatIconModule,RouterOutlet,RouterLink,MatInputModule,MatFormFieldModule,FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  menuType :string="defalut";
  sellerName :string="";
  userName :string="";
  searchResult: undefined | product[]
  cartItem=0;
 
constructor(private rout:Router, private product: ProductService){}

 ngOnInit(): void{
  
  this.rout.events.subscribe((val:any)=>{
    if(val.url){
    if(localStorage.getItem('seller') && val.url.includes('seller'))
    {
      let sellerStore=localStorage.getItem('seller');
      let sellerData=sellerStore && JSON.parse(sellerStore)[0];
      this.sellerName=sellerData.name;
      this.menuType="seller"
    }
   else if(localStorage.getItem('user')) {
      let userStore=localStorage.getItem('user');
      let userData=userStore && JSON.parse(userStore);
      this.userName=userData.name;
      this.menuType="user" 
      this.product.getCartList(userData.id)
    }
    else
    {
      this.menuType="default"
    }
  }
  }) 
  
  let cartData = localStorage.getItem('localCart');
  if(cartData)
  {
    this.cartItem= JSON.parse(cartData).length
  }
  this.product.cartData.subscribe((items)=>{
    this.cartItem=items.length
  })
 }

logout()
{
  localStorage.removeItem('seller')
  this.rout.navigate(['/'])
}

userLogout(){
  localStorage.removeItem('user')
  this.rout.navigate(['/user-auth'])
  this.product.cartData.emit([]);
}


searchProduct(query : KeyboardEvent)
{
   if(query)
   {
    const element = query.target as HTMLInputElement;
    this.product.searchProduct(element.value).subscribe((result)=>{
       console.warn(result)
       this.searchResult= result
    })
   
   }
}

}
