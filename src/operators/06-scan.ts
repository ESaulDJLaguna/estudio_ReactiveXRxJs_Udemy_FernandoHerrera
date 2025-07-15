/*
! scan: es exactamente lo mismo al operador reduce, con la diferencia de que cuando los valores son emitidos por el observable, inmediatamente van saliendo conforme van ingresando (pero sale el valor acumulado):

! `.scan((acc, curr) => acc + curr, 0)`
! acc: es el valor acumulado
! curr: es el valor actual o current value
! (acc + curr): es la función que va a retornar el valor acumulado más el valor actual
! 0: indica cuál es el valor inicial que tiene el acumulador (si no se envía un valor inicial, por defecto es 0)

! Supongamos que en la entrada tenemos los siguientes valores: 1, 3, 5. Cuando el input emite el valor 1, inmediatamente la salida del `scan()` será 1, ahora cuando la entrada emite el valor 3, la salida será 4, finalmente cuando se emita el 5 en la salida se tendría 9 y cuando el observable se completa no pasará nada porque ya se habrá emitido el último valor.
*/

import {from} from "rxjs";
import {map, reduce, scan} from "rxjs/operators";

const numeros = [1, 2, 3, 4, 5];

const totalAcumulador = (acc, curr) => acc + curr;

//! Reduce
from(numeros).pipe(reduce(totalAcumulador, 0)).subscribe(console.log);

//! Scan
from(numeros).pipe(scan(totalAcumulador, 0)).subscribe(console.log);

//! Redux: scan podría ser la base del patrón Redux. En pocas palabras, "Redux es manejar el estado global de la aplicación en un único objeto"
interface Usuario {
  id?: string;
  autenticado?: boolean;
  token?: string;
  edad?: number;
}

//! Se va a simular de que se tendrán varias emisiones de cambios que va a recibir el usuario
const user: Usuario[] = [
  {id: "fher", autenticado: false, token: null}, // No está autenticado
  {id: "fher", autenticado: true, token: "ABC"}, // Se autentica
  {id: "fher", autenticado: true, token: "ABC123"}, // Se refresca el token
];

const state$ = from(user).pipe(
  scan<Usuario, Usuario>(
    (acc, curr) => {
      return {...acc, ...curr};
    },
    {edad: 33}
  )
);

// const id$ = state$.pipe(map((state) => state.id));
const id$ = state$.pipe(map((state) => state));

id$.subscribe(console.log);
