import { Component, OnInit } from '@angular/core';
import { HttpService } from '../shared/http.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-adding',
  templateUrl: './adding.component.html',
  styleUrls: ['./adding.component.css']
})
export class AddingComponent implements OnInit {
  noteForm: FormGroup;
  note;
  disabled = false;
  now = new Date();

  constructor(private http: HttpService, 
    private router: Router) {

   }

//жизненный цикл приложения
// функции массивов

  ngOnInit() {
    this.noteForm = new FormGroup(
      {
        text: new FormControl({value: '', disabled: this.disabled}, [Validators.required]),
        date: new FormControl({value: '', disabled: this.disabled}, [Validators.required]),
      }
    )

  }


  async add(){
    try{
      this.note = await this.http.postNotes(
        {
          "dateAdd": `${this.now.getFullYear()}-${this.now.getMonth()+1}-${this.now.getDate()}`, //2000-02-02
          "body": this.noteForm.value.text,
          "dateExit": this.noteForm.value.date
        }
      )
      this.router.navigate(['/']);
    }catch(e){
      console.error(e)
    }
  }

}
