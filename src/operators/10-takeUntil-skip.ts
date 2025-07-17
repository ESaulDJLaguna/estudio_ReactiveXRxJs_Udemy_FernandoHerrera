//! takeUntil: es un operador que recibe como argumento otro Observable. Se traduciría como: "Sigue recibiendo los valores y sigue emitiéndolos hasta que el segundo observable emita su primer valor".
//! skip: operador que permite saltar u omitir 'x' cantidad de emisiones iniciales.

import {fromEvent, interval} from "rxjs";
import {skip, takeUntil, tap} from "rxjs/operators";

const boton = document.createElement("button");
boton.innerHTML = "Detener Timer";

document.querySelector("body").append(boton);

const counter$ = interval(1000);
// const clickBtn$ = fromEvent(boton, "click");
const clickBtn$ = fromEvent(boton, "click").pipe(
  tap(() => console.log("tap antes del skip")),
  //! Con skip indicamos que salte la primer emisión del observable fromEvent, es decir, que para detener el observable counter$ se tendrá que dar click dos veces al botón, porque en realidad la primer emisión del botón fue ignorada, por decirlo de alguna forma, la "verdadera" primer emisión de este observable fue el segundo clic.
  skip(1),
  //! Cuando se da clic la primera vez en el botón NO se ejecuta este operador, porque le indicamos a skip que "salte" TODO lo que sigue después de la primer emisión
  tap(() => console.log("tap después del skip"))
);

//! El observable interval emitirá los valores hasta que el observable clickBtn$ emita su primer valor
counter$.pipe(takeUntil(clickBtn$)).subscribe({
  next: (val) => console.log("next:", val),
  complete: () => console.log("complete"),
});
