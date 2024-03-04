import { Component, OnInit} from '@angular/core';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { ProductService } from '../services/product.service';
import { order } from '../data-type';

@Component({
  selector: 'app-my-orders',
  standalone: true,
  imports: [MatDividerModule, MatButtonModule],
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.css'
})
export class MyOrdersComponent {
  orderData: order[]| undefined
  constructor(private product: ProductService){}
  ngOnInit():void{
  this.getOrderList();

  }

  cancelOrder(orderId:number|undefined){
    orderId && this.product.cancelOrder(orderId).subscribe((result)=>{
    this.getOrderList();

  })

}

getOrderList(){
  this.product.orderList().subscribe((result)=>{
    this.orderData=result
})
}
}