//! fromEvent: es una función que nos permite crear observables en base a un EventTarget, por ejemplo: `fromEvent<Event>(document, 'scroll')`, en este caso el EventTarget es el document y solo quiero saber los eventos que sean emitidos del document que tienen que ver con el scroll, en otras palabras, con esta instrucción, cuando hacemos scroll en el document va a emitir dichos eventos, este fromEvent "no tiene fin", a menos que se cancele, se termine la subscripción, etc.

import {fromEvent} from "rxjs";

//! Si no se define el tipo de dato, se disparará un Event (el cual es event genérico), por lo cual no podremos acceder a las propiedades y métodos correctos del evento emitido.
//! Una forma de saber el tipo de dato que emitirá el evento es crear un fromEvent sin tipado: `fromEvent(target, eventName)`, después suscribirnos a dicho observable e imrprimir en consola la información que es emitida, en ella se mostrará el tipo de evento que se está emitiendo

//! Eventos del DOM.
const src1$ = fromEvent<PointerEvent>(document, "click");
const src2$ = fromEvent<KeyboardEvent>(document, "keyup");

//! Una forma más conveniente de trabajar con los argumentos es utilizando la destructuración del ECMAScript 6. Ya sabemos que se está emitiendo el PointerEvent y si solo nos interesan unas cuantas propiedades, por ejemplo, (x, y), podemos desestructurarlas como se muestra a continuación
src1$.subscribe(({x, y}) => {
  console.log(x, y);
});

src2$.subscribe((evento) => {
  console.log(evento.key);
});
