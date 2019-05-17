import { of, from, timer, interval } from 'rxjs';

of('😍', '🙃').subscribe(console.log)


from(['😍', '🙃']).subscribe(console.log)
