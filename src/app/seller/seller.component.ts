import { Component,OnInit } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { SellerService } from '../services/seller.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { signUp } from '../data-type';

@Component({
  selector: 'app-seller',
  standalone: true,
  imports: [MatCardModule,MatButtonModule, FormsModule],
  templateUrl: './seller.component.html',
  styleUrl: './seller.component.css'
})
export class SellerComponent implements OnInit {
  localStorage: Storage = window.localStorage;
  constructor(private seller: SellerService, private router: Router){ }


 signUp(data:signUp):void
 {
 this.seller.userSignup(data);
 }
 
 ngOnInit(){
   this.seller.reloadSeller();
 }
     
  
  }

