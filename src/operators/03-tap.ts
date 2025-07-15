//! tap: nos ayuda a ver cómo va fluyendo la información a través de nuestros observables. Esta función se utiliza para disparar efectos secundarios. Es decir, cuando un observable emita información a las subscripciones, la información emitida será recibida por tap y ese mismo valor es lo que se emitirá a las subscripciones, dentro de tap se podrá realizar cualquier cosa necesaria con esa información, pero no podará ser manipulada.
import {range} from "rxjs";
import {map, tap} from "rxjs/operators";

const numeros$ = range(1, 5);

numeros$
  .pipe(
    //! Los argumentos de tap podría ser el valor del observable, un Partial<TapObserver<infoType>> o las funciones next, error y complete (que representarían un observer)
    tap((x) => {
      console.log("antes del map", x);

      //! tap NO cambia el flujo de información, es decir, aunque exista un return explícito, este será ignorado, ya que lo que entra a tap es lo que sale.
      return 100;
    }),
    map((val) => val * 10),
    //! Si por ejemplo el map modificará el tipo de dato a un string, tap recibiría un string y no un número
    tap({
      //! next: se ejecutará cada vez que el tap reciba el siguiente valor
      next: (x) => console.log("después del map", x),
      //! complete: se ejecutan cada vez que TODO el observable se complete y se hace de manera consecutiva, es decir, si el tap anterior tuviera un complete, primero terminaría ese y a continuación el complete del segundo tap
      complete: () => console.log("Se terminó todo"),
    })
  )
  .subscribe((val) => console.log("subs", val));
