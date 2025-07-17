//! distinct: es un operador que permite pasar únicamente los valores que NO han sido previamente emitidos por el observable, por ejemplo, si el observable emite los valores "1, 1, 2, 3, 3, 4, 1", al utilizar distinct, lo que se emitirá a las subscripciones u otros operadores subsiguientes al distinct es: "1, 2, 3, 4", y los valores "repetidos" no los emitirá porque ya se habrán emitido una vez

import {from, of} from "rxjs";
import {distinct} from "rxjs/operators";

const numeros$ = of(1, "1", 1, 3, 3, 2, 2, 4, 4, 5, 3, 1, "1");

numeros$
  .pipe(
    //! Internamente distinct utiliza el operador `===`, es decir, que 1 es diferente que '1'
    distinct()
  )
  .subscribe({
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
    nombre: "Megaman",
  },
  {
    nombre: "Zero",
  },
];

from(personajes)
  .pipe(
    //! Recordemos que se mencionó que distinct internamente utiliza el operador `===`, por lo tanto, todos los objetos que se están procesando son totalmente diferentes (aunque compartan la misma información, porque apuntan a una dirección en memoria distinta). Por lo tanto, se debe enviar un predicado con la propiedad que se quiere evaluar que NO SE REPITA.
    distinct((p) => p.nombre)
  )
  .subscribe(console.log);
