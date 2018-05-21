import { Component, OnInit } from '@angular/core';
import {CalculationsService} from '../../services/calculations.service';

@Component({
  selector: 'app-calculations-list',
  templateUrl: './calculations-list.component.html',
  styleUrls: ['./calculations-list.component.css']
})
export class CalculationsListComponent implements OnInit {

  public calculations;

  constructor(private calculationsService: CalculationsService) {
  }

  ngOnInit() {
    this.getCalculations();
  }

  getCalculations() {
    this.calculationsService.getCalculations().subscribe(
      data => {
        this.calculations = data;
      },
      err => console.error(err),
      () => console.log('calculations loaded')
    );
  }
}
