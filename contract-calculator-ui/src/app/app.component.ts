import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div style="text-align:center">
      <h1>
        {{title}}
      </h1>
    </div>
    <router-outlet></router-outlet>
    <br>
    <a href="/calculations">Calculations</a>
    <br>
    <a href="/calculations/add">Add calculation</a>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Contract Calculator';
}
