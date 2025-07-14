//! range: es una función que crea un observable que emite una secuencia de números en base a un rango. Por defecto son síncronos, pero pueden convertirse en asíncronos utilizando un asyncScheduler. Una vez emitido el último valor del rango, se completará el observable

import {asyncScheduler, of, range} from "rxjs";

//! Esta función NO quiere decir que emitirá los valores del 1 al 5, sino que emitirá desde la posición inicial (1) y quiero 5 emisiones (los 5 valores consecutivos siguientes), para demostrar esto, se puede utilizar: `range(-5, 10)`, en este caso comenzará en -5 y terminará en 4 (-5, -4, -3, -2, -1, 0, 1, 2, 3, 4)
// const src$ = range(1, 5);
//! Si solo se especifica un parámtro, comenzará a emitir desde 0 y obtendrá los 'n' valores consecutivos siguientes
// const src$ = range(5); // (0, 1, 2, 3, 4)
//! CUALQUIER función que emite valores síncronos se puede convertir en asíncrono utilizando `asyncScheduler`. Por lo que primero se imprimirán los console.log (Inicio y Fin) y a continuación los valores del 1 al 5
const src$ = range(1, 5, asyncScheduler);

console.log("Inicio");
src$.subscribe(console.log);
console.log("Fin");
