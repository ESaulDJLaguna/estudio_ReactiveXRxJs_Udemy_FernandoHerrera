//! pluck: es un operador muy útil cuando solo se necesita extraer solamente una propiedad del objeto que estamos recibiendo y que ese sea la salida del observable. También se puede extraer propiedades de objetos anidados
import {fromEvent} from "rxjs";
import {pluck} from "rxjs/operators";

const keyup$ = fromEvent<KeyboardEvent>(document, "keyup");

const keyupPluck$ = keyup$.pipe(
  //! El primer argumento es la propiedad que se quiere extraer del objeto. En este caso keyurp$ está emitiendo un KeyboardEvent, dentro del cual existe la propiedad key, de esta forma, el nuevo valor emitido solo será el valor de la propiedad key (hay que tener cuidado con el argumento que se pasa ya que al ser un string podríamos enviar algo que no existe)
  // pluck("key")
  //! Si un objeto tiene objetos anidados y necesitamos extraer alguna de las propiedades del objeto anidado, se tiene que enviar en los argumentos las propiedades anidadas. Es decir, en este ejemplo, el tipo KeyboardEvent tiene una propiedad target la cual es un objeto que dentro tiene una propiedad baseURI, por lo que para "llegar" a esta propiedad anidada se tiene que pasar como parámetros las propiedades necesarias hasta llegar a ella. En otras palabras, si en javaScript quisieramos acceder a esa información, ser haría `target.baseURI`, en este caso cada objeto es un parámetro.
  pluck("target", "baseURI")
);

keyup$.subscribe(console.log);
keyupPluck$.subscribe((code) => console.log("pluck", code));
