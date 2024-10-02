import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FinancialRecord } from './financial-record.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  public yearOptions: number[] = Array.from({ length: 2020 - 2015 + 1 }, (_, i) => 2015 + i);
  public selectedYear: number = 0;
  public selectedTab: string = 'tab1';
  public financialRecords: FinancialRecord[] = [];
  public filteredFinancialRecords: FinancialRecord[] = [];
  public pdfs: { [key: number]: string } = {
    2016: '../assets/2016.pdf#toolbar=0',
    2017: '../assets/2017.pdf#toolbar=0',
    2018: '../assets/2018.pdf#toolbar=0',
  }
  public isLoading: boolean = false;

  async getFinancialRecords() {
    this.isLoading = true;
    const endpoint = 'https://kind-pebble-0d3217d0f.5.azurestaticapps.net/data-api/rest/FinancialRecords';
    const response = await fetch(endpoint);
    const data = await response.json();
    setTimeout(() => {
      this.financialRecords = data.value;
      this.filteredFinancialRecords = data.value;
      this.isLoading = false;
    }, 5000);
  }

  ngOnInit(): void {
    this.getFinancialRecords();
  }

  onDropdownChange($event: any) {
    this.selectedYear = $event.target.value as number;

    this.filteredFinancialRecords = this.financialRecords.filter(r => r.Year == this.selectedYear);
  }

  onTabChange($event: any) {
    this.selectedTab = $event.target.value;
  }
}
