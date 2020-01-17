import { Pipe, PipeTransform } from '@angular/core';
import { isNullOrUndefined } from 'util';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(notes: any[],  sortParam: string, filterParam: string) {
    
    if (sortParam === undefined && filterParam === ''){
      return notes;
    }

    if (sortParam !== undefined){
      switch(sortParam){
        
        case "dateExit": {
          notes = notes.sort((function (a, b) {
            if ( Number(String(a.dateExit).split('-').join('')) < Number(String(b.dateExit).split('-').join(''))){
              return -1;
            }else if(Number(String(a.dateExit).split('-').join('')) > Number(String(b.dateExit).split('-').join(''))){
              return 1;
            }else return 0;
          }))
          break;
        }
        case "dateAdd": {
          notes = notes.sort((function (a, b) {
            if (Number(String(a.dateAdd).split('-').join('')) < Number(String(b.dateAdd).split('-').join(''))){
              return -1;
            }else if(Number(String(a.dateAdd).split('-').join('')) > Number(String(b.dateAdd).split('-').join(''))){
              return 1;
            }else return 0;
          }))
          break;
        }
      }
    }

    if (!isNullOrUndefined(notes) && filterParam.trim() !== "") {
      let filter = notes.filter(
        note => note.body.toLowerCase().indexOf(filterParam.toLowerCase()) === 0);
      return filter;
    }

    return notes;

  }


  

}


