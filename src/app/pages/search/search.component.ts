import { Component, inject, OnInit } from '@angular/core';
import { MasterService } from '../../service/master.service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [AsyncPipe, FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent implements OnInit {
  locations$: Observable<any[]> = new Observable<any[]>();
  masterServ = inject(MasterService);
  busList: any[] = [];

  searchObj: any = {
    fromLocation: '',
    toLocation: '',
    travelDate: '',
  };

  ngOnInit(): void {
    this.getAllLocations();
  }

  getAllLocations() {
    this.locations$ = this.masterServ.getLocations();
  }
  onSearch() {
    this.masterServ
      .searchBus(
        this.searchObj.fromLocation,
        this.searchObj.toLocation,
        this.searchObj.travelDate
      )
      .subscribe((response) => {
        // Handle search results
        console.log(response);
        this.busList = response;
      });
  }
}
