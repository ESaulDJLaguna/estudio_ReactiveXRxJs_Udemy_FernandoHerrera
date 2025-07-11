import {Observable, Observer, Subject} from "rxjs";

const observer: Observer<any> = {
  next: (value) => console.log("next: ", value),
  error: (error) => console.warn("error: ", error),
  complete: () => console.log("complete"),
};

//! Se requiere crear un observable que cada 1 segundos emita un valor aleatorio
const intervalo$ = new Observable<number>((subs) => {
  const intervalID = setInterval(() => subs.next(Math.random()), 1000);

  return () => {
    clearInterval(intervalID);
    console.log("Intervalo destruido");
  };
});

//! Al realizar múltiples subscripciones, el valor aleatorio generado en cada una de ellas va a ser diferente, pero, ¿qué pasa si quiero que TODAS las subscripciones compartan el mismo valor? Esto lo resuelve el Subject.
// const subs1 = intervalo$.subscribe((rnd) => console.log("subs1: ", rnd));
// const subs2 = intervalo$.subscribe((rnd) => console.log("subs2: ", rnd));

/*
! Subject:

! 1. Casteo múltiple: muchas subscripciones van a estar sujetas a este mismo Subject (observable) y va a servir para distribuir la misma información a todos los lugares donde estén inscritos
! 2. También es un observer, es decir, se puede pasar como parámetro a un `.subscribe()`
! 3. También se puede manejar: next, error y complete
*/

//! Se crea el Subject
const subject$ = new Subject<number>();
//! Nos suscribimos al Observable que queremos que emita el mismo valor en todas las subscripciones siguientes, para que esto sea posible, le enviamos el Subject como parámetro
const subscription = intervalo$.subscribe(subject$);

//! Ahora el Subject será el "nuevo Observable" que emitirá el mismo valor, por lo que ahora debemos suscribirnos a él tantas veces se necesite
// const subs1 = subject$.subscribe((rnd) => console.log("subs1: ", rnd));
// const subs2 = subject$.subscribe((rnd) => console.log("subs2: ", rnd));

const subs1 = subject$.subscribe(observer);
const subs2 = subject$.subscribe(observer);

setTimeout(() => {
  /*
	! Recordemos que una carecterística principal del Subject es que también es un Observer, por lo tanto, también tiene sus métodos next, error y complete.
  ! Por lo tanto, podemos emitir valores utilizando el Subject, de esta manera podemos insertar información al flujo de datos que el Observable (en este caso intervalo$) está emitiendo.
	! Cuando la data es producida por el observable en sí mismo (intervalo$), es considerado un "Cold Observable". Pero cuando la data es producida FUERA del observable (subject$) es llamado "Hot Observable"
	*/
  subject$.next(10);
  //! Con este `.complete()` se está completado el subject$ no el observable "original" (es decir, el intervalo$). En otras palabras, hacer un complete del subject$ NO ejecutará el return de intervalo$, por lo tanto, en este ejemplo, jamás se limpiará el setInterval y seguirá consumiendo memoria. NO se ejecuta el return de intervalo$ porque esto solo se hará cuando se llame al unsubscribe de esa subscripción (intervalo$)
  subject$.complete();

  //! Aquí finalmente se llama al return del Observable intervalo$, por lo tanto, ahora sí se ejecuta el `clearInterval()`
  subscription.unsubscribe();
}, 3500);
