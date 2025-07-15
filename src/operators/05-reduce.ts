/*
! reduce: hace lo mismo que el reduce de JavaScript, es decir, lo que hace es aplicar una función acumuladora a las emisiones producidas por el observable.

! Supongamos que en la entrada tenemos los siguientes valores: 1, 3, 5. `reduce()` NO emitirá un valor por cada emisión de datos, sino que cada valor emitido estará siendo procesado por el reduce y le estará aplicando la función que se le envío, por ejemplo:

! `.reduce((acc, curr) => acc + curr, 0)`
! acc: es el valor acumulado
! curr: es el valor actual o current value
! (acc + curr): es la función que va a retornar el valor acumulado más el valor actual
! 0: indica cuál es el valor inicial que tiene el acumulador (si no se envía un valor inicial, por defecto es 0)

! Siguiendo el ejemplo anterior, cada valor de entrada (1, 3, 5) no va a emitir ningún valor sino que hasta que el observable se completa, entonces ahí es donde se obtendrá el total acumulado, en este caso: 9

! NOTA: un inconveniente de reduce, es que en ocasiones se va a necesitar el valor acumulado en el momento de la emisión, por ejemplo, en el ejemplo más abajo del interval, cuando se emite un valor, en ese instante se va a necesitar el valor acumulado y por cada emisión vamos a querer los valores acumulados, en este caso, reduce no va a servirnos.
*/

import {interval} from "rxjs";
import {reduce, take, tap} from "rxjs/operators";

const numbers = [1, 2, 3, 4, 5];

const totalReducer = (acumulador: number, valorActual: number) => {
  return acumulador + valorActual;
};

//! Primero se hará la demostración de cómo funciona reduce de JavaScript
const total = numbers.reduce(totalReducer, 0);
// console.log("total arr", total);

//! Recordemos que el primer valor que emite interval es 0
interval(500)
  .pipe(
    //! completa el observable después de la cantidad de veces que se especificó dentro de él
    take(6),
    tap(console.log),
    //! Podemos observar que no se muestra ningún valor sino hasta que se emite el sexto valor (ya que esto se definió en el take) y recordemos que se mencionó que reduce NO emite ningún valor por cada dato que procesa, sino que lo hace una vez se completa el observable. Para poder ver cómo se está procesando cada valor, se utiliza el tap anterior. Recordemos que el valor inicial del acumulador es opcional, si no se agrega, iniciará en 0
    reduce(totalReducer)
    // reduce(totalReducer, 5)
  )
  .subscribe({
    next: (val) => console.log("next:", val),
    complete: () => console.log("Complete"),
  });
