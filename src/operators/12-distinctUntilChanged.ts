//! distinctUntilChanged: es muy similar a distinct, con la diferencia de que sí permite emitir valores repetidos, SIEMPRE Y CUANDO ese valor repetido NO haya sido el valor anterior, es decir, supongamos que se emiten los valores: "1, 2, 2, 3, 4, 1, 2", eso quiere que los subscriptores "recibirán": "1, 2, 3, 4, 1, 2" (como se observa, solo se emitió uno de los primeros 2 porque estaban repetidos uno después del otro, pero se volvió a emitir el 2 final, porque el anterior era un 1)

import {from, of} from "rxjs";
import {distinctUntilChanged} from "rxjs/operators";

const numeros$ = of(1, "1", 1, 3, 3, 2, 2, 4, 4, 5, 3, 1, "1");

numeros$.pipe(distinctUntilChanged()).subscribe({
  next: console.log,
  complete: () => console.log("complete"),
});

interface Personaje {
  nombre: string;
}

const personajes: Personaje[] = [
  {
    nombre: "Megaman",
  },
  {
    nombre: "Megaman",
  },
  {
    nombre: "X",
  },
  {
    nombre: "Zero",
  },
  {
    nombre: "Dr. Willy",
  },
  {
    nombre: "X",
  },
  {
    nombre: "X",
  },
  {
    nombre: "Megaman",
  },
  {
    nombre: "Zero",
  },
];

from(personajes)
  .pipe(distinctUntilChanged((prev, curr) => prev.nombre === curr.nombre))
  .subscribe(console.log);
