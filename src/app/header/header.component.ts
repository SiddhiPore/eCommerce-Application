import { Component, OnInit } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { RouterLink, RouterOutlet } from '@angular/router';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router'

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatButtonModule,MatIconModule,RouterOutlet,RouterLink,MatInputModule,MatFormFieldModule,FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  menuType :string="defalut"
  sellerName :string='';
constructor(private rout:Router){}

 ngOnInit(): void{
  
  this.rout.events.subscribe((val:any)=>{
    if(val.url)
    {
    console.warn(val.url)
    if(localStorage.getItem('seller') && val.url.includes('seller'))
    {
      console.warn("In seller area")
      this.menuType="seller"
    }
    if(localStorage.getItem('seller'))
    {
      let sellerStore=localStorage.getItem('seller');
      let sellerData=sellerStore && JSON.parse(sellerStore)[0];
      this.sellerName=sellerData.name;
    }
    else{
      console.warn("outside area")
      this.menuType="default"
    }
  }
  })   
 }

logout()
{
  localStorage.removeItem('seller')
  this.rout.navigate(['/home'])
}

}
