import {from, of} from "rxjs";

/*
! of: toma 'n' argumentos y genera una secuencia de valores
! from: crea un observable en base a un: array, promise, iterable, observable, etc.
*/

const observer = {
  next: (val) => console.log("next:", val),
  complete: () => console.log("complete"),
};

//! Utilizando from, al suscribirnos, se realizarán 5 emisiones...
// const source$ = from([1, 2, 3, 4, 5]);
//! ... mientras que con of, el mismo arreglo solo se emitirá 1 vez. Para realizar el mismo efecto que con from, se tendría que utilizar el operador spred: `...[1, 2, 3, 4, 5,]`
// const source$ = of([1, 2, 3, 4, 5]);

//! Enviar una cadena al from realizará una emisión por cada letra...
// const source$ = from("Cadena");
//! ... mientras que hacer lo mismo con of, solo realizará una emisión
// const source$ = of("Cadena");

// source$.subscribe(observer);

//! El from nos permite tomar casi cualquier cosa y convertirla en un Observable. En este ejemplo enviaremos una promesa utilizando fetch (es una función de JavaScript que permite realizar una petición http). La respuesta en el body de una petición fetch es un `ReadableStream` y para poder ver el resultado se tiene que extraer en un json, el cual también es una promesa
// const source$ = from(fetch("https://api.github.com/users/klerith"));

//! Como se mencionó, el body de la respuesta es un ReadableStream y para leer dicha respuesta se utiliza el `resp.json()` el cual también devuelve una promesa. Una manera fácil de resolver esa segunda promesa es indicar que la función es async (es decir, que devolverá una promesa) y ahora utilizando el await ya tendríamos todo el body listo para ser utilizado
// source$.subscribe(async (resp) => {
//   console.log(resp);

//   const dataResp = await resp.json();
//   console.log(dataResp);
// });

//! Otro uso del from es que puede trabajar con las funciones generadoras o iterables en JavaScript. Un iterable es un objeto que nos permite obtener los valores de manera secuencial del mismo. El "*" nos dice que es una función generadora
const miGenerador = function* () {
  //! Con yield emitimos valores
  yield 1;
  yield 2;
  yield 3;
  yield 4;
  yield 5;
};

const miIterable = miGenerador();

//! Una forma de mostrar los valores generados sería con un for tradicional
// for (let id of miIterable) {
//   console.log(id);
// }

//! Con un observable se puede tomar al iterable y obtener esos valores en secuencia. La ventaja de realizarlo así es que se pueden aplicar más operadores a la secuencia emitida y podría transformarse la data o realizar algunas otras cosas más
from(miIterable).subscribe(observer);
