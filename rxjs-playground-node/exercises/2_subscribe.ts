import { simpleTimer$ } from './data/simple-timer';


const observer = {
  next: e => console.log(e),
  error:  err => console.error(err),
  complete: () => console.info('Complete')
}

simpleTimer$.subscribe(observer);
