//! take: es útil cuando se quiere limitar la cantidad de emisiones que un observable puede tener. Una vez que emite el último valor (el cual se definió en take), se llamará al complete de la subscripción y el observable original se terminará

import {of} from "rxjs";
import {take, tap} from "rxjs/operators";

const numeros$ = of(1, 2, 3, 4, 5);

numeros$
  .pipe(
    //! Otra característica del take es que cancela la ejecución del observable, es decir, aunque numeros$ todavía no ha terminado de emitir los 5 valores, como take limitó a las primeras 3, los valores restantes ya no se emitirán y para eso utilizamos el tap, para demostrar esto
    tap((t) => console.log("tap", t)),
    //! Una vez se realicen las 3 primeras emisiones se completará el observable
    take(3)
  )
  .subscribe({
    next: (val) => console.log("next", val),
    complete: () => console.log("complete"),
  });
