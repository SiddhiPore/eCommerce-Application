import { Component , OnInit} from '@angular/core';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import{Router, RouterLink} from '@angular/router'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgbCarouselModule,MatCardModule,MatDividerModule,RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  productData: undefined | product;
  productQuantity : number=1
  removeCart = false
  popularProduct : undefined | product[]
  trndyProduct : undefined | product[]
  constructor(private product:ProductService, private router: Router){}

  ngOnInit(): void{
 this.product.popularProduct().subscribe((data)=>{
  console.warn(data)
  this.popularProduct = data
 })

 this.product.trndyProduct().subscribe((data)=>{
  this.trndyProduct=data
 })
  }

  redirecttoDetails(productId : number)
  {
     this.router.navigate(['/details',productId])
  }

  addtoCart()
{
  if(this.productData){
    this.productData.quantity=this.productQuantity;
    if(!localStorage.getItem('user')){
    
       this.product.localAddToCart(this.productData);
       this.removeCart= true;

    } 
   
  }
}
}
