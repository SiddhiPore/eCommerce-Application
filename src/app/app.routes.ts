import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SellerComponent } from './seller/seller.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { authGuard } from './auth.guard';
import { SellerAddProductComponent } from './seller-add-product/seller-add-product.component';
import { SellerUpdateProductComponent } from './seller-update-product/seller-update-product.component';
import { SearchComponent } from './search/search.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { UserAuthComponent } from './user-auth/user-auth.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { HhComponent } from './hh/hh.component';


export const routes: Routes = [
    {
        path: '' ,
        component: HomeComponent
    },
    {
        path:'seller',
        component: SellerComponent
    },
    {
        path:'seller-home',
        component:SellerHomeComponent,
        canActivate:[authGuard]
    },
    {
        path: 'seller-add-product',
        component:SellerAddProductComponent,
        canActivate:[authGuard]
    },
    {
        path: 'seller-update-product/:id',
        component:SellerUpdateProductComponent,
        canActivate:[authGuard]
    },
    {
        path:'search/:query',
        component : SearchComponent
    },
    {
         path :'details/:productId',
     component: ProductDetailsComponent
    },
    {
        path:'user-auth',
        component: UserAuthComponent,
        
    },
    {
        path:'cart-page',
        component:CartPageComponent
    },
    {
        path: 'checkout',
        component: CheckoutComponent
    },
    {
        path: 'my-order',
        component: MyOrdersComponent
    },
    {
        path:'hh',
        component:HhComponent
    }
];
