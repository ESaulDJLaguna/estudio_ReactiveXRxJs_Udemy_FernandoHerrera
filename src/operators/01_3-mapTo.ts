//! mapTo: permite transformar la entrada en una salida específica (cualquier tipo de dato: números, objetos, etc.). Por ejemplo, si utilizamos `mapTo('a')`, y el observable emite los valores: 1, 2, 3, ..., la salida de mapTo siempre será la a.

//! El MapTo sirve para tomar una emisión del observable y transformarla en lo que tú quieras (básicamente una constante). Por ejemplo, imaginate que un posteo HTTP se ejecute correctamente pero la respuesta cambió eventualmente en el backend, y esto está rompiendo tu código en el front-end, entonces usas el mapTo, emites la respuesta que necesitas y resuelves el problema con un simple operador.
import {fromEvent} from "rxjs";
import {mapTo} from "rxjs/operators";

const keyup$ = fromEvent<KeyboardEvent>(document, "keyup");

const keyupMapTo$ = keyup$.pipe(
  //! Puede regresar cualquier tipo de información
  mapTo("tecla presionada")
  // mapTo(1)
  // mapTo({v: 1})
);
keyupMapTo$.subscribe(console.log);
