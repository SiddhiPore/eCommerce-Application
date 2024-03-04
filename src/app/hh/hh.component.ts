import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-hh',
  standalone: true,
  imports: [MatButtonModule,MatCardModule,NgbCarouselModule],
  templateUrl: './hh.component.html',
  styleUrl: './hh.component.css'
})
export class HhComponent {
  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
}
