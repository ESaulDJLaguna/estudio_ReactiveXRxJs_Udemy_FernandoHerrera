//! asyncScheduler: NO crea un Observable, crea una subscripción. Recordemos que una subscripción es el producto de un subscribe, es decir, el `.subscribe()` de un observable genera una subscripción.

import {asyncScheduler} from "rxjs";

//! asyncScheduler "puede generar" (o puede funcionar como) un setTimeout o un setInterval
// setTimeout(() => {}, 3000);
// setInterval(() => {}, 3000);

//! Esta forma de utilizar asyncScheduler funciona como un setTimeout
const saludar = () => console.log("Hola Mundo");
//! El primer argumento es la función que se quiere ejecutar, mientras que el segundo es el tiempo en el que queremos ejecutarla.
// asyncScheduler.schedule(saludar, 2000);

const saludar2 = (name) => console.log(`Hola ${name}`);
//! Puede recibir un tercer parámetro el cual es el estado (state) del schedule. Este state funcionaría como los parámetros que requiere la función del primer parámetro
// asyncScheduler.schedule(saludar2, 2000, "Usuario");

interface Objeto {
  prop1: string;
  prop2: number;
}
const saludar3 = (obj: Objeto) =>
  console.log(`String: ${obj.prop1}. Number: ${obj.prop2}`);
//! No se pueden enviar más 3 parámetros a schedule, por lo tanto, si en el state se requieren más de un parámetro, se tendría que enviar un objeto.
// asyncScheduler.schedule(saludar3, 2000, {prop1: "Cadena", prop2: 17});

//! A continuación se mostrará como "configurar" un setInterval utilizando asyncScheduler

//! La función con la que este schedule va a trabajar NO puede ser una función de flecha
const subs = asyncScheduler.schedule(
  function (state) {
    console.log("state", state);

    //! Para que asyncScheduler "funcione" como un setInterval, tendremos que volver a ejecutar este mismo schedule enviándole el "nuevo estado" y como segundo parámetro, el tiempo en el que quiero que se ejecute
    this.schedule(state + 1, 1000);
  },
  //! El segundo parámetro es el tiempo en el que queremos que se empiece a ejecutar el asyncScheduler. Si se necesita que se comience a ejecutar tan pronto sea posible se envía un 0 (recordemos que NO es inmediato sino que hasta que el stack de callbacks de JavaScript se libere)
  3000,
  //! El tercer parámetro es el state, es decir, los parámetros que necesita la función (recordemos que si se necesitan más de uno, debe enviarse un objeto)
  0
);

//! Nos desuscribimos al "setInterval" que generamos con asyncScheduler para que ya no se siga ejecutando
// setTimeout(() => {
//   subs.unsubscribe();
// }, 6000);

//! Nos desuscribimos al "setInterval" que generamos con asyncScheduler para que ya no se siga ejecutando. Pero esta vez se hace con un asyncScheduler "tipo setTimeout"
asyncScheduler.schedule(() => subs.unsubscribe(), 6000);
