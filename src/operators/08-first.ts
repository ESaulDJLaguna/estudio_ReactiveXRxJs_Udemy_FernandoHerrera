//! first: emite el primer valor del observable o en caso de tener una condición, emite el primer valor que cumple dicha condición y completa la subscripción
import {fromEvent} from "rxjs";
import {map, take, tap, first} from "rxjs/operators";

const clicks$ = fromEvent<PointerEvent>(document, "click");

clicks$.pipe(
  tap(console.log),
  //! Muchas veces se va a encontrar el operador take para terminar un observable en la primer emisión, pero para eso sería mejor usar first
  // take(1)
  //! Una vez se da clic en cualquier parte, el observable se completa
  // first()
  //! Se le puede enviar un predicado para indicar una condición que debe cumplir la información emitida, una vez se cumpla dicha condición será emitidá (en el next) y se ejecutará el (complete). Aunque la información del observable emitirá tantas veces la información (esto se comprueba en el tap) los subscriptores solo recibirán la información una vez se cumpla la condición
  first<PointerEvent>((event) => event.clientY > 150)
);
// .subscribe({
//   next: (val) => console.log("next: ", val),
//   complete: () => console.log("complete"),
// });

//! Se explicará una forma de trabajar con la desestructuración en JavaScript
clicks$
  .pipe(
    tap<PointerEvent>(console.log),
    //! Esta forma y el map de abajo, sería formas similares de solo recuperar el clientX y clientY de mi PointerEvent
    // map((event) => ({
    //   clientY: event.clientY,
    //   clientX: event.clientX,
    // }))
    map(({clientX, clientY}) => ({clientX, clientY})),
    first((event) => event.clientY >= 150)
  )
  .subscribe({
    next: (val) => console.log("next: ", val),
    complete: () => console.log("complete"),
  });
