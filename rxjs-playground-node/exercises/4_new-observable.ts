import { Observable } from 'rxjs';

/*************************************/

// TODO
const myObservable$ = new Observable<string>(subscriber => {

  subscriber.next('😀');
  subscriber.next('😇');
  subscriber.next('🤪');

  setTimeout(() => {
    console.log('Er feuert doch!');
    subscriber.next('😡')
  }, 1000);


  subscriber.error('😱');


});

/*************************************/

const observer = {
  next: e => console.log(e),
  error: e => console.error('ERROR', e),
  complete: () => console.info('Complete')
};

const subscription = myObservable$.subscribe(observer);

setTimeout(() => subscription.unsubscribe(), 1000);
