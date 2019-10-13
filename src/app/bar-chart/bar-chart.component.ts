import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {

  constructor() { }
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
          yAxes: [{
              ticks: {
                  beginAtZero:true
              }
          }]
      }
  };
  public barChartLabels = ['Accident severity'];
  public barChartType = 'bar';
  public barChartLegend = true;

  private no1 = Math.floor(Math.random() * 30) + 1;
  private no2 = Math.floor(Math.random() * 30) + 1;
  private no3 = 100 - this.no1 - this.no2;

  public barChartData = [
    {data: [this.no1], label: "High severity"},
    {data: [this.no2], label: "Medium severity"},
    {data: [this.no3], label: "Low severity"}
  ];

  ngOnInit() {
  }

}
