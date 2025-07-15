//! map: es un operador que permite transformar lo que emite el observable en algo que nosotros ocupemos. Nos puede servir para extraer información o para transformarla o incluso regresar otra cosa totalmente diferente.
import {fromEvent, range} from "rxjs";
//! Dentro de 'rxjs' también existe el operador `map`, aunque no hay diferencia, hace referencia exactamente a la misma definición. Lo recomendado es utilizar 'rxjs/operators' para saber específicamente que queremos utilizar un operador.
import {map} from "rxjs/operators";

//! Suponiendo que se requiere que los valores emitidos se multipliquen por 10, se podría hacer este cálculo directamente en las subscripciones, pero, ¿qué pasaría si en todo el programa se requiere hacer esto en varios lugares y en un futuro en vez de ser 10 ahora es 11? Se tendría que buscar este calculo en todos los lugares y modificar el valor a 11, por lo que no es conveniente.
// range(1, 5).subscribe((val) => console.log(val * 10));

//! La idea es que cuando sale algo del observable, ese valor debería estar lo más procesado posible, es decir, lo más apegado a lo que yo necesito para trabajar directamente con él. En este ejemplo lo que se quiere es que en el subscribe ya venga multiplicado.
range(1, 5)
  //! pipe: es un método de los observables dentro del cual se colocará el operador u operadores y existe un orden en el que los operadores se van ejecutando a través del pipe
  .pipe(
    //! val es el valor que proviene del operador anterior o en este caso como no existe un operador antes, recibe el valor directo del range
    map<number, number>((val) => {
      //! Si no se poner un return dentro del map, se obtendrán 5 emisiones de undefined. Para evitar esto y estar seguros de que en este caso se devolverá un número, tendríamos que indicar el tipo de dato del map (map<number, number>), en este caso, el primer number representa la información que recibirá el map, mientras que el segundo, la información que retornará el map
      return val * 10;
    })
  )
  .subscribe(console.log);

const keyup$ = fromEvent<KeyboardEvent>(document, "keyup");
const keyupCode$ = keyup$.pipe(map((event) => event.code));

keyupCode$.subscribe((code) => console.log("map", code));

//! En este caso el keyup$.pipe() es una instancia diferente al keyup$.subscribe(), por lo tanto, en el subscribe NO va mostrarse la data transformada, para solucionarlo se hace de la manera anterior, almacenando la instancia de la transformación en una variable aparte: keyupCode$
// keyup$.pipe(map((event) => event.code));
// keyup$.subscribe((val) => console.log("map", val));
