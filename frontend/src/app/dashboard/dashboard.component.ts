import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ApiService, TimeSeriesDaily } from '../../services/api.service';
import { Chart } from 'chart.js';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['././dashboard.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
  ], // HttpClientModule is pulled in at AppModule level
})
export class DashboardComponent implements OnInit, AfterViewInit {
  @ViewChild('chartCanvas', { static: false }) chartCanvas!: ElementRef<HTMLCanvasElement>;
  chart!: Chart<'line'>;

  symbol = '';
  series: TimeSeriesDaily[] = [];
  loading = false;
  error: string | null = null;

  constructor(private api: ApiService) {}

  ngOnInit() {}

  ngAfterViewInit() {
    // initialize an empty chart
    this.chart = new Chart(this.chartCanvas.nativeElement.getContext('2d')!, {
      type: 'line',
      data: {
        labels: [],
        datasets: [{
          label: 'Close Price',
          data: []
        }]
      },
      options: {}
    });
  }

  onSearch() {
    if (!this.symbol.trim()) return;
    this.loading = true;
    this.error = null;

    this.api.getDailyTimeSeries(this.symbol.trim().toUpperCase())
      .subscribe({
        next: data => {
          this.series = data;
          this.updateChart();
          this.loading = false;
        },
        error: () => {
          this.error = 'Failed to load data for ' + this.symbol;
          this.loading = false;
        }
      });
  }

  private updateChart() {
    this.chart.data.labels = this.series.map(pt => pt.date);
    this.chart.data.datasets![0].data = this.series.map(pt => pt.close);
    this.chart.update();
  }
}
