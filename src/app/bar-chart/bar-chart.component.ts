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
  public barChartData = [
    {data: [30], label: "High severity"},
    {data: [50], label: "Medium severity"},
    {data: [60], label: "Low severity"}
  ];

  ngOnInit() {
  }

}
