import { Pipe, PipeTransform } from '@angular/core';

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
            if (a.dateExit < b.dateExit){
              return -1;
            }else if(a.dateExit > b.dateExit){
              return 1;
            }else return 0;
          }))
        }
          case "dateAdd": {
            notes = notes.sort((function (a, b) {
              if (a.dateAdd < b.dateAdd){
                return -1;
              }else if(a.dateAdd > b.dateAdd){
                return 1;
              }else return 0;
            }))
          
        }
      }
    }

    filterParam = filterParam.toLowerCase();
    return notes.filter(function (note) {
      if (note.body.toLowerCase().includes(filterParam) === true) {
        return true 
      } else {
        return false
      }
    })


  }

}
