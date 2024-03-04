import { Component,OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';
import{faCoffee} from '@fortawesome/free-solid-svg-icons'
import {RouterLink, RouterOutlet} from '@angular/router'
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-seller-home',
  standalone: true,
  imports: [MatButtonModule,MatIconModule,RouterLink,RouterOutlet],
  templateUrl: './seller-home.component.html',
  styleUrl: './seller-home.component.css'
})
export class SellerHomeComponent {
  productList:undefined | product[] ;
  productMessage:undefined | string;
  icon=faCoffee
  constructor(private product:ProductService){}
  ngOnInit():void{
  this.list();
  }

  deleteProduct(id:number)
  {
    console.warn("test id", id);
    this.product.deleteProduct(id).subscribe((result)=>{

     console.warn(result);
     if(result)
     {
      alert("The given product is deleted")
      this.list();
     }

    })
  }

  list()
  {
    this.product.productList().subscribe((result)=>{
      console.warn(result)
      this.productList=result;
    })
  }

}
