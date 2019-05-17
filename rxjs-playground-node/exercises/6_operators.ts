import { from } from 'rxjs';
import { map, filter, reduce } from 'rxjs/operators';

let dataArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// Hands on:
// mit 10 mulitplizieren
// alle kleiner als 50 herausfiltern
// die summe aus der übrig gebliebenen Zahlen

from(dataArray).pipe(
  map(x => x * 10),
  filter(x => x >= 50),
  reduce((x, y) => x + y)
)
.subscribe(console.log)

// in zukunft?

// from(dataArray)
//   |> map(x => x * 10)
//   |> filter(x => x >= 50)
//   |> reduce((x, y) => x + y)
