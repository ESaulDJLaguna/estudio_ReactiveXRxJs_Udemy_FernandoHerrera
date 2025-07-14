//! of: es una función que nos permite crear observables en base a un listado de elementos. Este operador va a emitir los valores en secuencia, uno por uno, de manera síncrona y cuando emite el último valor, se completa el Observable

//! Recordemos que importar algo de 'rxjs', significa que es algo para crear Obsrvables o bien interfaces para regular los observables
import {of} from "rxjs";

//! Los argumentos que se envian deben estar separados por comas,
const obs$ = of<number[]>(1, 2, 3, 4, 5, 6);
//! en este ejemplo, solo se está enviando un solo argumento que es un arreglo de números
// const obs$ = of<number[][]>([1, 2, 3, 4, 5, 6]);
//! Se podría emitir diferentes tipos de datos, para eso no se agrega un tipado
// const obs$ = of(
//   [1, 2],
//   {a: 1, b: 2},
//   function () {},
//   true,
//   Promise.resolve(true)
// );

//! Al agregar los console.log de inicio y fin queremos demostrar que esta función crea un Observable síncrono, si no lo fuera, ambos mensajes aparecerían primero antes que la secuencia
console.log("Inicio del obs$");
obs$.subscribe({
  next: (next) => console.log("next: ", next),
  //! Con esto demostramos de que una vez terminado de emitir el último valor, el observable se completa
  complete: () => console.log("Terminamos la secuencia"),
});
console.log("Fin del obs$");
