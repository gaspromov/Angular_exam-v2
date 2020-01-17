import { Component, OnInit } from '@angular/core';
import { HttpService } from '../shared/http.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  notes:any = [{}];
  date = new Date();
  
  constructor(
    private http: HttpService,
    ) { }


  async ngOnInit() {
    this.notes = await this.http.getNotes();
  }

  async onDelete(id: number){
    await this.http.deleteNotes(id);
    this.notes = await this.http.getNotes();
    console.log('yees');
  }

}
