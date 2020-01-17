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
  filterParam: string = '';
  sortParam: string = '';
  visibility = false;
  now = new Date();
  nowDate = `${this.now.getFullYear()}-${this.now.getMonth()<10? `0${this.now.getMonth()+1}`: this.now.getMonth()+1}-${this.now.getDate()}`;
  
  constructor(
    private http: HttpService,
    ) {
      this.sortForm = new FormGroup({
        sort: new FormControl(null),
      })
     }


  async ngOnInit() {
    this.notes = await this.http.getNotes();
  }

  async onDelete(id: number){
    await this.http.deleteNotes(id);
    this.notes = await this.http.getNotes();
  }

  async sorting(){
    this.notes = await this.http.getNotes();
  }

  dateValid(dateExit){
    if (this.dateToString(dateExit) < this.dateToString(this.nowDate)){
      return false;
    }else return true;
  }

  dateToString(date){
    return Number(String(date).split('-').join(''));
  }

}
