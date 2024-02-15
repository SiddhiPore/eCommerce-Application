import { EventEmitter,Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http'
import { login, signUp } from '../data-type';
import { BehaviorSubject } from 'rxjs';
import {Router} from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class SellerService {
  localStorage: Storage = window.localStorage;
  loginError = new EventEmitter<boolean>(false);
  isSellerLogedIn=new BehaviorSubject<boolean>(false)

  constructor(private http:HttpClient,private router:Router) {localStorage.setItem('isSellerLogedIn','false') }
  userSignup(data:signUp)
  {
    this.http.post("http://localhost:3000/seller",data,{observe:'response'}).subscribe((res)=>{

    this.localStorage.setItem('isSellerLogedIn','true');
    this.localStorage.setItem("seller",JSON.stringify(res.body))
    this.router.navigate(['seller-home']);
  })
  }
  reloadSeller()
  {
    if(this.localStorage.getItem('seller'))
    {
    this.localStorage.setItem('isSellerLogedIn','true');
    this.router.navigate(['seller-home']);
    }
  }




  userLogin(data:login)
  {
    this.http.get(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`,{observe:'response'}).subscribe((result:any)=>{
      console.warn(result);
      if(result && result.body && result.body.length){
         this.localStorage.setItem("seller",JSON.stringify(result.body))
         this.router.navigate(['seller-home']);
        console.warn("login successfully")
      }
      else{
        console.warn("Login Failed");
        this.loginError.emit(true);
      }
    })
  }
  }

