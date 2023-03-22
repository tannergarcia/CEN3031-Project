import { Component, OnInit,} from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'PhotoBomb';
  postId: any;
  ipAddy = '10.136.21.113';


    constructor(private http: HttpClient) { }

    /*ngOnInit() {
      console.log('testicles');
      this.http.get<any>('http://'+ this.ipAddy +':8080/download/list/?token=token', {}).subscribe(data => {
          this.postId = data.id;
          console.log(data);
      });
  }
  */
}
