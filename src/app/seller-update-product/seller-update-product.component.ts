import { Component, OnInit } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';


@Component({
  selector: 'app-seller-update-product',
  standalone: true,
  imports: [MatCardModule,MatButtonModule,FormsModule],
  templateUrl: './seller-update-product.component.html',
  styleUrl: './seller-update-product.component.css'
})
export class SellerUpdateProductComponent {
  productData : undefined | product
  constructor(private route:ActivatedRoute, private product:ProductService, private rout:Router ){}
  ngOnInit(): void{
   let productId = this.route.snapshot.paramMap.get('id')
   console.warn(productId)
   productId && this.product.getProduct(productId).subscribe((data)=>{
    console.warn(data)
    this.productData=data
   })

  }
  submit(data:product)
  {
     console.warn(data)
     if(this.productData)
     {
      data.id=this.productData.id
     }
     this.product.updateProduct(data).subscribe((result)=>{
      if(result)
      {
    alert("Product is Updated succssefully!!!");
    this.rout.navigate(['/seller-home']); 
      }
     })
  }

}
