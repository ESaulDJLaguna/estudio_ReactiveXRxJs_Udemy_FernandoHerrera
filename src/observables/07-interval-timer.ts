//! AMBAS FUNCIONES SON ASÍNCRONAS

//! interval: emitirá una secuencia de valores iniciando desde el 0 hasta el "infinito", y dicha secuencia se emitirá cada 'milisegundos' definidos en el argumento. Aunque se cancele la subscripción, el intérvalo va a seguir corriendo.
//! timer: emitirá un valor (0) después de los 'milisegundos' indicados en el argumento y después de emitirse dicho valor, se va a completar el observable
//! Si se agrega un 0 en los parámetros de interval o timer NO se iniciará automáticamente, sino que lo hará tan pronto como JavaScript y su stack de callbacks lo permita

import {interval, timer} from "rxjs";

const observer = {
  next: (val) => console.log("next:", val),
  complete: () => console.log("complete"),
};

//! Emite valores iniciando en 0 cada 1,000ms (1s)
const interval$ = interval(1000);

//! Emite el primer valor (0) después de 2,000ms (2s) y se dispara el complete
// const timer$ = timer(2000);
//! Emite el primer valor (0) después de 2,000ms (2s) y continúa emitiendo valores cada 1,000ms (1s). Funcionaría similar a interval (de igual manera NO se disparará el complete)
// const timer$ = timer(2000, 1000);
//! Podemos ejecutar el timer en una fecha específica
const hoyEn5 = new Date();
hoyEn5.setSeconds(hoyEn5.getSeconds() + 5);
const timer$ = timer(hoyEn5);

//! Demostramos que interval y timer son asíncronos. Primero se imrpimen los mensajes de los console.log y en seguida se emiten los valores
console.log("Inicio");
// interval$.subscribe(observer);
timer$.subscribe(observer);
console.log("Fin");

console.log(new Date());
