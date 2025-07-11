import {Observable, Observer, Subscriber} from "rxjs"; //! Si el import se extrae de 'rxjs', signifca que es algo para crear observables

//! CREAR UN OBSERVABLE
//! El símbolo $ nos ayuda a identificar que es un observable NO es obligatorio, pero es un estandar
// const obs$ = Observable.create(); //x create() is deprecated
/*
	! Dentro del Observable tendremos un objeto llamado 'Subscriber' (subs).
	! Esta definición del Observable me va a permitir crear subscripciones ("GENTE" que va a estar pendiente de las emiciones del Observable)
*/
const obs$ = new Observable<string>((subs: Subscriber<string>) => {
  //! next: va a emitir el valor que yo quiero a las "personas" que estén suscritas a él
  subs.next("Hola");
  subs.next("Mundo");

  subs.next("Hola");
  subs.next("Mundo");

  //! Forzamos un error para que se procese en `error` del subscribe(). No llega a `subs.complete()`
  // const a = undefined;
  // a.nombre = "Fernando";

  //! Indica que el observable ya no seguirá emitiendo valores o que los valores subsiguientes ya no son de importancia
  subs.complete();

  //! Se pueden seguir emitiendo valores, pero la salida no va a recibir dichos valores
  subs.next("Hola");
  subs.next("Mundo");
});

//! Para que un observable se ejecute tiene que tener por lo menos una subscripción, ya que el 'subscriber' va a notificar a las subscripciones, si no existen subscripciones, ¿a quién notificará el 'Subscriber'?
// obs$.subscribe((resp) => console.log(resp));
// obs$.subscribe(console.log); //! Desde ECMAScript 6 la llamada anterior se puede hacer de esta forma

//! Hay 3 posibles formas de envuar argumentos a un subscribe (notemos que el tipo de dato del argumento es un Partial<Observer<string>>):

// Forma 1: lo que hace es procesar el 'next' del Subscriber. Se puede interpretar que la función `(resp) => {...}` la estamos transformando en un Subscriber
// obs$.subscribe((resp: string) => {
//   console.log(resp);
// });

// Forma 2: la otra forma que tenemos para comunicarnos o enviar información al `.subscribe()`, es definir 3 callbacks: next, error y complete (se ejecuta cuando el Observable se complete)
// obs$.subscribe(
//   (valor) => console.log("next: ", valor),
//   (error) => console.warn("error: ", error),
//   () => console.info("complete")
// );

// Forma 3: se le puede enviar un Observer (es una interfaz que me obligará a establecer lo que se necesita para que ese Observer tenga todo lo que se necesita para que sea un Observer válido)
const observer: Observer<any> = {
  next: (value) => console.log("siguiente [next]: ", value),
  error: (error) => console.warn("error [obs]: ", error),
  complete: () => console.log("complete [obs]"),
};

obs$.subscribe(observer);
