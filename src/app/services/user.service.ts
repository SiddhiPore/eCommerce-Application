import { EventEmitter, Injectable } from '@angular/core';
import { login, signUp } from '../data-type';
import { HttpClient } from '@angular/common/http';
import { response } from 'express';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  localStorage: Storage = window.localStorage;
  loginError = new EventEmitter<boolean>(false);
 

  constructor(private http:HttpClient, private router:Router) { }


  userSignup(data:signUp)
  {
    this.http.post("http://localhost:3000/users",data,{observe:'response'}).subscribe((res)=>{

    this.localStorage.setItem("user",JSON.stringify(res.body))
    this.router.navigate(['/']);
  })
  }
  reloadSeller()
  {
    if(this.localStorage.getItem('user'))
    {
    this.router.navigate(['/']);
    }
  }




  userLogin(data:login)
  {
    this.http.get<signUp[]>(`http://localhost:3000/users?email=${data.email}&password=${data.password}`,{observe:'response'}).subscribe((result:any)=>{
      console.warn(result);
      if(result && result.body && result.body.length){
         this.localStorage.setItem("user",JSON.stringify(result.body))
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
