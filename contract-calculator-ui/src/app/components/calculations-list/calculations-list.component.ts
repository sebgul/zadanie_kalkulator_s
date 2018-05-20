import { Component, OnInit } from '@angular/core';
import {CalculationsService} from '../../services/calculations.service';

@Component({
  selector: 'app-calculations-list',
  templateUrl: './calculations-list.component.html',
  styleUrls: ['./calculations-list.component.css']
})
export class CalculationsListComponent implements OnInit {

  public calculations;

  constructor(private calculationService: CalculationsService) {
  }

  ngOnInit() {
    this.getCalculations();
  }

  getCalculations() {
    this.calculationService.getCalculations().subscribe(
      data => {
        this.calculations = data;
      },
      err => console.error(err),
      () => console.log('calculations loaded')
    );
  }
}
