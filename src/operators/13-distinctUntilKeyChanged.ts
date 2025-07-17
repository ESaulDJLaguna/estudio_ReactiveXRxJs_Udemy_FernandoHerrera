//! distinctUntilKeyChanged: es muy similar a distinctUntilChanged (utilizado con objetos NO con primitivos). Es decir, que permite emitir valores (objetos) repetidos, siempre y cuando el anterior no haya sido igual. Como parámetro se tiene que enviar la propiedad que se quiere "evaluar" si es igual a la anterior

import {from} from "rxjs";
import {distinctUntilChanged, distinctUntilKeyChanged} from "rxjs/operators";

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
  .pipe(
    // distinctUntilChanged((prev, curr) => prev.nombre === curr.nombre)
    //! Podemos obsevar que funcionaría igual que el `distinctUntilChanged` anterior, pero el código es más legible ya que solo se requiere la propiedad a evaluar
    distinctUntilKeyChanged("nombre")
  )
  .subscribe(console.log);
