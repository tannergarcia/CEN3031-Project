import { Injectable } from '@angular/core';

@Injectable()

export class ContentService {
  pages: Object = {
    'home': {title: 'home', slogan: 'A picture is worth a thousand words...', image: 'assets/Background.jpg'},
    'register': {title: 'Register', slogan: 'Welcome...', image: 'assets/Background1.jpg'},
    'forget': {title: 'Forget', slogan: 'Here to help...', image: 'assets/BackgroundE.jpg'}
  };

}
