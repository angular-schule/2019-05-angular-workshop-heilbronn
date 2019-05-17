import { simpleTimer$ } from './data/simple-timer';

simpleTimer$.subscribe(
  e => console.log(e),
  err => console.error(err),
  () => console.info('Complete')
);
