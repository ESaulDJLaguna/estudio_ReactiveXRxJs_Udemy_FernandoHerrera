import {fromEvent} from "rxjs";
import {map, tap} from "rxjs/operators";

const texto = document.createElement("div");
texto.innerHTML = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec pulvinar scelerisque tellus, vel pellentesque massa tincidunt sit amet. Cras ut euismod ipsum, at gravida nunc. Vestibulum faucibus leo nec sollicitudin pellentesque. Fusce scelerisque aliquet molestie. Fusce pulvinar ipsum libero, sed gravida tortor tincidunt id. Nam viverra, diam lacinia tempor pulvinar, mi massa aliquet diam, sit amet faucibus velit tortor sit amet tellus. Vivamus quis luctus quam, sollicitudin vestibulum est. Nunc malesuada, orci vitae gravida sollicitudin, ex urna pretium justo, quis rutrum ante ligula id leo. Cras tempor, ligula ut mollis mattis, elit neque tincidunt nisl, non ullamcorper dui purus eu arcu. Proin laoreet imperdiet vestibulum.
<br/><br/>
Nunc in tellus mattis, maximus justo in, rutrum augue. Mauris sit amet facilisis dui. In tellus eros, posuere eget est at, vestibulum congue sem. Donec ac porttitor urna, sed ultrices tellus. Fusce aliquam imperdiet lacus, a tempor purus pharetra vel. Praesent consequat, arcu ac consequat ullamcorper, ipsum augue porttitor orci, at semper diam est eget metus. Nullam suscipit eros ligula. Ut rhoncus leo malesuada justo ullamcorper congue. Pellentesque suscipit iaculis venenatis. Nunc dignissim ligula quis mi condimentum volutpat. Curabitur turpis augue, imperdiet nec finibus at, consectetur tempus felis.
<br/><br/>
Praesent sollicitudin ex et ultricies viverra. Phasellus sit amet semper lectus. Ut nec quam mi. Nam mattis nulla at auctor aliquam. Vivamus condimentum a eros at convallis. Vestibulum aliquet, dui id efficitur porttitor, risus magna congue turpis, congue consectetur felis quam et velit. Suspendisse quis nunc mattis, egestas felis et, dapibus enim. Fusce id fermentum diam. Maecenas vestibulum nulla ac erat sodales, fringilla consectetur augue rutrum. Proin augue quam, consequat id iaculis non, placerat a ante. Aenean porttitor diam vel libero convallis, sed rhoncus eros laoreet. Phasellus rhoncus mauris vel mi lacinia finibus.
<br/><br/>
Fusce in aliquet quam. Aliquam aliquet egestas egestas. Phasellus iaculis enim leo, et rutrum justo ullamcorper non. Aliquam finibus gravida augue eget feugiat. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Mauris ut orci non purus ornare consequat at eu magna. Quisque faucibus egestas ex, quis pellentesque ligula. Mauris volutpat, nibh non ultrices mollis, lorem magna mattis sapien, quis consequat nibh dolor interdum nisi. Duis quis quam in ex aliquam accumsan. Praesent consectetur congue mauris nec semper. Praesent eleifend neque id rhoncus ultricies.
<br/><br/>
Etiam maximus porttitor nisi ac sollicitudin. Duis ut diam fermentum metus pellentesque iaculis. Curabitur in ultricies enim. Suspendisse tortor urna, facilisis eu mi vitae, egestas imperdiet nisl. Aenean tempor nisl nisi, ut bibendum lectus ullamcorper et. Proin et lectus odio. Ut semper neque eu vulputate tincidunt. Aliquam mauris eros, tempor at suscipit et, ultrices a magna. Nullam sed nulla nunc. Nam consequat sem eu orci cursus interdum. Nam ultrices auctor ante quis egestas. Quisque eleifend mauris sed pellentesque tincidunt. Cras a enim mollis ipsum sollicitudin condimentum et sed velit. Donec interdum, quam ac sagittis fermentum, nisi nisl fermentum massa, quis euismod libero nibh vel mi. Curabitur ac fermentum dui, sed suscipit ligula.
<br/><br/>
Fusce ultricies varius pharetra. Nulla efficitur scelerisque risus. Donec ut elit ultricies nisi eleifend efficitur sit amet in nunc. Curabitur in neque augue. Suspendisse tristique porta imperdiet. Donec interdum, augue eget tincidunt porttitor, risus justo malesuada augue, eget aliquam tellus purus placerat ex. Donec semper nisi quis arcu sollicitudin, sit amet convallis arcu commodo. Aliquam non quam ac nisl lacinia vulputate elementum facilisis justo. Suspendisse sed placerat erat. Mauris eget placerat orci. Pellentesque vel sodales mauris. Integer venenatis odio ac dui ornare, ac ornare elit iaculis. Aliquam erat volutpat.
<br/><br/>
Donec id facilisis enim, id iaculis massa. Etiam quis tellus est. Nulla ac feugiat ligula. Aliquam at nunc sit amet nisi vehicula pretium. Donec sagittis interdum risus et viverra. Sed nulla dui, commodo eget risus at, egestas luctus nisl. Nulla commodo elit quis augue tincidunt, et facilisis felis semper. Sed condimentum est et condimentum commodo. Etiam sed leo dolor. Mauris iaculis feugiat facilisis. Nulla egestas nulla non tortor luctus hendrerit.
<br/><br/>
Aliquam vel justo varius, vestibulum libero ut, scelerisque nunc. Suspendisse cursus est nec massa elementum vehicula. In malesuada, sem vitae eleifend ultricies, neque magna commodo risus, non placerat tortor ipsum eget magna. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Curabitur nec varius mi. Sed ultrices lacus tellus, nec malesuada dolor posuere sed. Maecenas accumsan tellus magna, ac tincidunt turpis commodo id. Vivamus porta efficitur lacinia. Morbi commodo id ante eu tempus. Ut efficitur lectus in enim blandit, tincidunt venenatis mi egestas. Donec tempus luctus ipsum, vitae fermentum massa blandit tincidunt. Donec sem ex, auctor vel ex sit amet, condimentum rhoncus diam. Vestibulum imperdiet sit amet mauris sed convallis. Mauris feugiat pellentesque sapien, ut lacinia eros varius ac.
<br/><br/>
Nulla facilisi. Nam mattis ligula at mi lobortis, non lacinia ex congue. Duis consequat ultricies neque, sed molestie felis tincidunt et. Vestibulum mattis tristique lacinia. Suspendisse dignissim vitae nisi id laoreet. Sed in iaculis enim, vel tempor dui. Nunc congue magna in felis bibendum, eu euismod mauris faucibus. Nunc aliquet elit a velit condimentum elementum. Suspendisse rutrum vehicula feugiat. Pellentesque at tristique dolor.
<br/><br/>
Curabitur euismod nulla ante, ut facilisis purus faucibus sed. Fusce at arcu facilisis, consectetur tortor et, eleifend leo. Nam ut risus sit amet turpis dignissim mattis non scelerisque nisi. Praesent sollicitudin nibh ac venenatis pulvinar. Nam venenatis lectus a leo ultricies viverra. Sed blandit pretium est. Praesent sodales neque id lorem posuere aliquet. Morbi non sem quis purus tincidunt condimentum sed quis lorem. Sed lobortis ac mauris lobortis vehicula. Curabitur eget semper ipsum. Donec venenatis sagittis diam, et pulvinar risus. Mauris vitae elementum mi.
`;

const body = document.querySelector("body");
body.append(texto);

const progressBar = document.createElement("div");
progressBar.setAttribute("class", "progress-bar");
body.append(progressBar);

//! función que haga el cálculo
const calcularPorcentajeScroll = (event) => {
  const {scrollTop, scrollHeight, clientHeight} = event.target.documentElement;
  console.log({scrollTop, scrollHeight, clientHeight});

  return (scrollTop / (scrollHeight - clientHeight)) * 100;
};

//! Streams
const scroll$ = fromEvent(document, "scroll");
// scroll$.subscribe(console.log);

const progress$ = scroll$.pipe(
  // map((event) => calcularPorcentajeScroll(event)
  //! Como el map recibe un evento y eso es lo que se envía a la función, se puede hacer simplemente lo siguiente
  map(calcularPorcentajeScroll),
  tap(console.log)
);

progress$.subscribe((porcentaje) => {
  progressBar.style.width = `${porcentaje}%`;
});
