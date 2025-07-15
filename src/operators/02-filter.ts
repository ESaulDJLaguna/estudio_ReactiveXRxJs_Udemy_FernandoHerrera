//! filter: sirve para filtrar las emisiones de los valores que emite el observable. Es decir, de nuestro flujo de datos, solo vamos a "permitir" que se emitan los que cumplan con la condición establecida dentro del filter
import {from, fromEvent, range} from "rxjs";
import {filter, map} from "rxjs/operators";

//! En este caso se utiliza para mostrar los valores impares de una secuencia
// range(1, 10)
//   .pipe(filter((val) => val % 2 === 1))
//   .subscribe(console.log);

//! filter lo que recibe como parámetro es un predicado, este predicado es una función que tiene dos parámetros: `value`, que es cada valor emitido por el flujo de datos, `index`, es el índice del valor actual emitido; y lo que devuelve este predicado es un valor booleano. Por lo tanto, cada vez que se devuelva un true, significa que el valor del flujo actual de datos cumplió la condición establecida y por lo tanto ese valor se emitirá a los suscriptores
range(20, 10).pipe(
  filter((val, i) => {
    console.log("index", i);

    return val % 2 === 1;
  })
);
// .subscribe(console.log);

interface Personaje {
  tipo: string;
  nombre: string;
}

const personajes: Personaje[] = [
  {
    tipo: "heroe",
    nombre: "Batman",
  },
  {
    tipo: "heroe",
    nombre: "Robin",
  },
  {
    tipo: "villano",
    nombre: "Joker",
  },
];

const personajes$ = from<Personaje[]>(personajes);
const heroes$ = personajes$.pipe(filter((p) => p.tipo === "heroe"));
const villanos$ = personajes$.pipe(filter((p) => p.tipo === "villano"));

console.log("Flujo de datos original:");
personajes$.subscribe(console.log);

console.log("Herores");
heroes$.subscribe(console.log);

console.log("Villanos");
villanos$.subscribe(console.log);

const keyup$ = fromEvent<KeyboardEvent>(document, "keyup").pipe(
  map<KeyboardEvent, string>((event) => event.code),
  filter((key) => key === "Enter")
);
keyup$.subscribe(console.log);
