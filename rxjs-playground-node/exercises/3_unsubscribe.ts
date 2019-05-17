import { simpleTimer$ } from './data/simple-timer';

const subscription = simpleTimer$.subscribe(
  e => console.log(e),
  e => console.error(e),
  () => console.info('Complete')
);

/******************************/

setTimeout(() => {
  subscription.unsubscribe();
}, 4000)

