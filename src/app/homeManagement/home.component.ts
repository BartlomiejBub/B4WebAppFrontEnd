import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AppService } from '../AAMain/appService';
import { T } from '../i18n/language';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {

  public t = T;

  constructor(public appService: AppService) {
  }

}
