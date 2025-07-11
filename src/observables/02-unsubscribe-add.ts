import {Observable, Observer, Subscription} from "rxjs";

const observer: Observer<any> = {
  next: (value) => console.log("next: ", value),
  error: (error) => console.warn("error: ", error),
  complete: () => console.log("complete"),
};

//! Este observable, cada vez que el subscriber haga un next, EMITIRÁ un 'number'
const intervalo$ = new Observable<number>((subscriber) => {
  let count = 0;

  const interval = setInterval(() => {
    count++;
    subscriber.next(count);

    //! Con esto demostramos que si no se limpia el intérvalo, aunque se cancele una subscripción, éste seguirá emitiéndose
    console.log(count);
  }, 1000);

  setTimeout(() => {
    //! Cuando se llama al `complete()` inmediatamente se va a ejecutar la función que se tenga en el return del Observable y aunque se llame n veces al `unsubscribe` ninguna de ellas ejecutará la función del return porque el complete ya lo habrá hecho
    subscriber.complete();
  }, 2500);

  //! El intérvalo debería de cancelarse cuando se llama al `.unsubscribe()`, para eso se require una referencia al setInterval. En el `return` del `Observable` ponemos el procedimiento que queremos que se ejecute cuando se hace el `.unsubscribe()`
  return () => {
    clearInterval(interval);
    console.log("Intérvalo destruido");
  };
});

//! El método `subscribe()` retorna una subscripción (Subscription). Cuando nos suscribimos, se crea una nueva instancia del Observalbe y por lo tanto, todo el código dentro de él va a empezar
const subs1: Subscription = intervalo$.subscribe(observer);
const subs2: Subscription = intervalo$.subscribe(observer);
const subs3: Subscription = intervalo$.subscribe(observer);

//! Se pueden encadenar subscripciones a una, es decir, `add` permite agregar subscripciones hijas, de esta manera, cuando se llame al unsubscribe de subs1, va a llamar la función que va a limpiar todas las subscripciones "hijas anidadas". Con la única diferencia que solo se ejecutará UNA SOLA VEZ el `complete()`, que sería el complete de la subscripción "padre"
subs1.add(subs2);
subs1.add(subs3);

setTimeout(() => {
  //! Después de 3 segundos se va a cancelar la subscripción, sin embargo, el `setInterval()` del Subscriber NO se va a cancelar, para demostrar esto, se imprimirá el valor del contador, de esta manera se podrá observar que aunque ya se ha cancelado la subscripción el setInterval sigue emitiendo valores, esto lleva a problemas de fuga de memoria
  // subs1.unsubscribe();
  // subs2.unsubscribe();
  // subs3.unsubscribe();

  subs1.unsubscribe();

  console.log("Completado timeout");
  //! El `unsubscribe()` NO se va a ejecutar después de 6 segundos, sino que se ejecutará a los 3 porque definimos un `setTimeout` que después de 3 segundos llame el `complete`
}, 6000);
