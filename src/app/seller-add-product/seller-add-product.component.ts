import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-add-product',
  standalone: true,
  imports: [MatCardModule,MatButtonModule,FormsModule],
  templateUrl: './seller-add-product.component.html',
  styleUrl: './seller-add-product.component.css'
})
export class SellerAddProductComponent {

  constructor(private product:ProductService, private rout: Router){}
  submit(data: product)
  {
    //console.warn(data)
    this.product.addProduct(data).subscribe((result)=>{
      console.warn(result)
      if(result)
      {
        alert("Product is successfully added!!!!")
        this.rout.navigate(['/seller-home']); 
      }
    })
  }

}
