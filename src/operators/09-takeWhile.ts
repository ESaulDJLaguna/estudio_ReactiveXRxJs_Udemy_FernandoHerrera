//! takeWhile: permite recibir valores mientras la condición se cumpla. Cuando uno de los valores emitidos por el observable no cumple la condición, las subscripciones se completan

import {fromEvent} from "rxjs";
import {map, takeWhile} from "rxjs/operators";

const click$ = fromEvent<PointerEvent>(document, "click");

click$
  .pipe(
    //! Del tipo PointerEvent solo me interesa las propiedades {x, y}, así que realizamos una desestructuración.
    map(({x, y}) => ({x, y})),
    //! Sabemos que map emite un objeto {x, y}, como solo me interesa la 'y', hacemos otra desestructuración. Con `takeWhile` indicamos que queremos emitir valores (a los subscriptores) siempre y cuando 'y' sea menor o igual a 150, cuando sea mayor a este valor, la subscrpciones se van a completar (NO emitirá el valor que haga que la condición del takeWhile no se cumpla)
    // takeWhile(({y}) => y <= 150)
    //! En caso de que se requiera que se emita el valor que "rompe" la condición de takeWhile, se debe envíar el argumento `inclusive = true`
    takeWhile(({y}) => y <= 150, true)
  )
  .subscribe({
    next: (val) => console.log("next:", val),
    complete: () => console.log("complete"),
  });
