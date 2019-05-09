<img src="http://assets.angular.schule/logo-angular-workshop-ng8.png">

#### **von Johannes Hoppe**

[![Join the chat at https://gitter.im/2019-05-angular-workshop-heilbronn/community](https://badges.gitter.im/2019-05-angular-workshop-heilbronn/community.svg)](https://gitter.im/2019-05-angular-workshop-heilbronn/community?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

<hr>

**Schön, dass Du dabei bist!**  
Merke dir schon einmal dieses Repository.  
Hier wird während des Workshops stets der Quelltext unserer Beispielanwendung verfügbar sein.
> **https://github.com/angular-schule/2019-05-angular-workshop-heilbronn**

Damit wir gleich durchstarten können, solltest Du ein paar Vorbereitungen treffen.  
Die gesamte Installation wird rund 30 Minuten dauern. 

## Benötigte Software

1. **Node.js 10.9** oder höher: [https://nodejs.org](https://nodejs.org)
   + Mac-Benutzer bitte Homebrew verwenden! ([siehe Anleitung](https://presentations.angular.schule/HOMEBREW_NODE))
2. **Google Chrome:** [https://www.google.com/chrome/](https://www.google.com/chrome/)
   + **[Redux DevTools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)** (Chrome Extension)
4. **Visual Studio Code:** [https://code.visualstudio.com](https://code.visualstudio.com)
   + [Angular-Schule: Extension Pack](https://marketplace.visualstudio.com/items?itemName=angular-schule.angular-schule-extension-pack)  (Visual Studio Code Extension)
5. optional: **Git** (und ggf. ein grafischer Client wie SourceTree oder GitExtensions)


Überprüfe bitte anschließend die Versionen, damit wir beim Workshop alle auf dem gleichen Stand sind.

```
node -v
> Erwartet: v10.9.x oder höher

npm -v
> Erwartet: 6.x oder höher
```


## Proxy?

Für eine Proxykonfiguration im Unternehmensnetz sind gesonderte Einstellungen nötig.
Wir haben dir hierfür folgende Anleitung erstellt:
https://presentations.angular.schule/PROXY.html  
Sollte es Probleme mit dem Proxy geben, melde Dich bitte bei uns, dann finden wir eine Lösung.


## Projekte installieren

Mithilfe des vorbereiteten Angular-Projekts werden wir die meisten Übungen durchführen.
Unter anderem werden wir komplexe Zustände („States“) mit dem Framework NgRx effizient verwalten.

Bitte führe folgende Befehle aus:

```
git clone https://github.com/angular-schule/2019-05-angular-workshop-heilbronn.git
cd 2019-05-angular-workshop-heilbronn
cd book-rating-ngrx
npm install
npm start
```

> ACHTUNG: Bei Fehlern mit `node-gyp` bzw. `node-sass` bitte noch einmal ausführen: `npm i node-sass`.

Die Installation kann bei langsamer Internetverbindung sehr lange dauern.
Warte beim Schritt `Installing packages for tooling via npm.` mit Geduld ab!

> Auf http://localhost:4200 sollte nun eine vorbereitete Website erscheinen!
Wenn bei allen Teilnehmern das Grundgerüst steht, können wir ohne Zeitverlust loslegen.

Wir werden ebenso in die Welt der Reaktiven Programmierung mit RxJS eintauchen.
Hier dreht sich alles um reaktive Datenströme, Observables, Operatoren, Subjects und Subscriptions. 

Bitte führe folgende Befehle aus:

```
cd 2019-05-angular-workshop-heilbronn
cd rxjs-playground-node
npm install
npm test
```

### Ich freue mich schon! 🙂


Sollte es zu einer Fehlermeldung kommen, dann sende uns den Fehlertext einfach per Mail an [team@angular.schule](mailto:team@angular.schule).  
Wir werden schnell eine Lösung finden.


<hr>

<img src="http://assets.angular.schule/logo-angular-schule.png" height="60">

### &copy; 2019 https://angular.schule | Stand: 09.05.2019



