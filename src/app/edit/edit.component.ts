import { Component, OnInit } from '@angular/core';
import { HttpService } from '../shared/http.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  id:number;
  editForm: FormGroup;
  note;
  disabled = false;

  constructor(
    private http: HttpService,
    private route: Router,
    private activeRoute: ActivatedRoute,
  ) { 
    this.activeRoute.params.subscribe(param => {
      this.id = param.id;
    })
  }

  ngOnInit() {
    this.getNote().then(() => {
      this.editForm = new FormGroup(
        {
          text: new FormControl({value: this.note.body, disabled: this.disabled}, [Validators.required]),
          date: new FormControl({value: this.note.dateExit, disabled: this.disabled}, [Validators.required]),
        }
      )
    })
    
  }

  async getNote(){
    try{
      this.note = await this.http.getNotesById(this.id)
    }catch(e){
      console.log(e);
    }
  }

  async edit(){
    try{
      await this.http.putNotes(
        this.id,
        {
          dateAdd: this.note.dateAdd,
          body: this.editForm.value.text,
          dateExit: this.editForm.value.date,
        }
        );
      this.route.navigate(['/']);
    }catch(e){
      console.log(e);
    }
  }
  
}
