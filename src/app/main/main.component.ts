import { Component, OnInit } from '@angular/core';
import { HttpService } from '../shared/http.service';
import { FormGroup, FormControl } from '@angular/forms';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  notes:any = [{}];
  date = new Date();
  sortForm: FormGroup;
  sortParam: any;
  filterParam: any;
  
  constructor(
    private http: HttpService,
    ) {
      this.sortForm = new FormGroup({
        sort: new FormControl(null),
      })
     }


  async ngOnInit() {
    this.notes = await this.http.getNotes();
    let sort = this.http.getSort();
    this.sortParam = (isNullOrUndefined(await sort)) ? '' : await sort;
    console.log(this.sortParam)
    // this.sortParam = this.sortParam[1]["name"];
    let filter = this.http.getFilter();
    this.filterParam = (isNullOrUndefined(await filter)) ? '' : await filter;
    this.filterParam = this.filterParam[1]["name"]
    this.sortForm.patchValue({
      sort: this.sortParam
    })
    console.log(this.sortParam, this.filterParam);
  }

  async onDelete(id: number){
    await this.http.deleteNotes(id);
    this.notes = await this.http.getNotes();
  }

  async sorting(){
    this.sortParam = this.sortForm.value.sort;
    await this.http.putSort({
      "id": 1,
      "name" : this.sortParam,
    });
  }

  async filtering(){
    await this.http.putFilter({
      "id": 1,
      "name": this.filterParam,
    })
  }

}
