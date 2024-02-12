import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SellerComponent } from './seller/seller.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { authGuard } from './auth.guard';


export const routes: Routes = [
    {
        path: 'home' ,
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
       
    }
];
