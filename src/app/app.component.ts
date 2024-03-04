import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { HomeComponent } from './home/home.component';
import { SellerComponent } from './seller/seller.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SellerService } from './services/seller.service';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { SellerAddProductComponent } from './seller-add-product/seller-add-product.component';
import { ProductService } from './services/product.service';
import{faCoffee} from '@fortawesome/free-solid-svg-icons'
import { SellerUpdateProductComponent } from './seller-update-product/seller-update-product.component';
import { UserAuthComponent } from './user-auth/user-auth.component';
import { UserService } from './services/user.service';
import { CartPageComponent } from './cart-page/cart-page.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { HhComponent } from './hh/hh.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,HeaderComponent,MatButtonModule,MatIconModule, HomeComponent,SellerComponent, FormsModule,HttpClientModule, SellerHomeComponent,SellerAddProductComponent, SellerUpdateProductComponent, UserAuthComponent, CartPageComponent, CheckoutComponent, MyOrdersComponent,HhComponent],
  providers:[SellerService, ProductService, UserService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'eCommerceApp';
}
