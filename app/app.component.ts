import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PhotoBomb';

  displayCard = false;

  getCard(){
    //bring up page component card
    this.displayCard = !this.displayCard;
  }

  goHome(){
    this.displayCard = false;
  }
  
}

