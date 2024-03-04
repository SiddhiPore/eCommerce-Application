import { Component , OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { cart, order, paymethod } from '../data-type';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [FormsModule,MatInputModule,MatSelectModule,MatFormFieldModule,MatDividerModule,MatButtonModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {
  totalPrice: number| undefined
  cartData:cart[]|undefined

  pay: paymethod[] = [
    {value: 'UPI-0', viewValue: 'UPI'},
    {value: 'wallets-1', viewValue: 'wallets'},
    {value: 'Credit/Debit/ATM Card-2', viewValue: 'Credit/Debit/ATM Card'},
    {value: 'Cash on Delivery-3 ', viewValue: 'Cash on Delivery'},
  ];
constructor(private product: ProductService, private router: Router){}

 ngOnInit():void{
  this.product.currentCart().subscribe((result)=>{
    this.cartData=result
    let price=0
    result.forEach((item)=>{
      if(item.quantity){
        price=price+(+item.price* + item.quantity)
      }  
    })
    this.totalPrice=price + (price/10)+ 100-(price/10)
  console.warn(this.totalPrice)
  
    })
 }
  orderNow(data:{email:string, address: string, details: string}){
    let user=localStorage.getItem('user');
    let userId=user && JSON.parse(user).id;

    if(this.totalPrice){
      let orderData:order={
        ...data,
        totalPrice : this.totalPrice,
        userId,
        id: undefined,
        
      }
      this.cartData?.forEach((item)=>{
      setTimeout(() => {

       item.id && this.product.deleteCartItem(item.id)
        
      }, 600);
      })
      this.product.orderNow(orderData).subscribe((result)=>{
        if(result){
          alert("Order Placed");
          this.router.navigate(['/my-order'])
        }

      })
    }
  

  }

}
