/* Una api REST nos permite obtener informacion sobre diferentes elementos al poder consumir
   datos desde una fuente externa en este caso vamos a hacer uso de https://pokeapi.co para poder 
   comunicar el servicio del front con un server en backend, siendo que toda la bd de pokemones 
   ya existe por lo tanto unicamente se va a consumir */

   const pokeApiUrl = "https://pokeapi.co/api/v2";
   const pokedex = () => {
       /* Este es un objeto auxiliar que nos permite acceder a los campos destinados a mostrar.
          Las estadisticas del pokemon que queremos buscar, esto haciendo uso de la API DOM que ya se vio. */
       const pokemonStatsElements = {
           hp: document.getElementById("pokemonStatHp"),
           attack: document.getElementById("pokemonStatAttack"),
           defense: document.getElementById("pokemonStatDefense"),
           specialAttack: document.getElementById("pokemonStatSpecialAttack"),
           specialDefense: document.getElementById("pokemonStatSpecialDefense"),
           speed: document.getElementById("pokemonStatSpeed"),
       };
       /* Se crea una variable para una referencia auxiliar que nos permitirá utilizar
          las clases que están dentro del archivo de la css para los colores acorde la 
          clase del pokemon. */
       let currentClassType = null;
       /* Se crea una constante para obtener un template de la imagen que queremos visualizar
          del tipo del pokemon. */
       const imageTemplate = "<img class='pokedisplay' src='{imgSrc}' alt='pokedisplay'>";
       /* Se crea un objeto que se encargue de guardar las rutas de las imágenes que nos servirán de apoyo 
          para las busquedas y cuando no se encuentre el pokemon. */
       const images = {
           imgPokemonNotFound: "../img/404.png",
           imgLoading: "../img/loading.gif"
       };
       /* Se crea un objeto para obtener las referencias de los elementos que despliegan la info del pokemon. */
       const containers = {
           imageContainer: document.getElementById("pokedisplay-container"),
           pokemonTypesContainer: document.getElementById("pokemonTypes"),
           pokemonNameElement: document.getElementById("pokemonNameResult"),
           pokemonAbilitiesElement: document.getElementById("pokemonAbilities"),
           pokemonMovesElement: document.getElementById("pokemonMoves"),
           pokemonIdElement: document.getElementById("pokemonId")
       };
       /* Vamos a obtener las referencias de los botones de acción */
       const buttons = {
           all: Array.from(document.getElementsByClassName("btn")),
           search: document.getElementById("btnSearch"),
           next: document.getElementById("btnUp"),
           previous: document.getElementById("btnDown")
       };
       /* Se crea una función que debe ir buscando dentro de la API los datos conforme al elemento de búsqueda,
          eso quiere decir que si yo pongo "pikachu" esta función debe obtener el nombre, debe realizar una búsqueda
          en BD de la API, obtener la coincidencia y de ahí ir segmentando los datos de 1 en 1. */
       const processPokemonTypes = (pokemonData) => {
           let pokemonType = "";
           // Primero debemos de obtener a qué clase pertenece para hacer referencia a su css
           const firstClass = pokemonData.types[0].type.name;    
           // Ya que obtuve el nombre y la clase debo empezar a diferenciar los elementos
           pokemonData.types.forEach((pokemonTypeData) => {
               // Vamos a crear una etiqueta para saber la clase del pokemon y meterlo en un
               // arreglo
               pokemonType += `<span class="pokemon-type ${pokemonTypeData.type.name}">${pokemonTypeData.type.name}</span>`;
           });
           // Se debe quitar la clase previa en el contenedor de habilidades y movimientos
           if(currentClassType){
               containers.pokemonMovesElement.classList.remove(currentClassType);
               containers.pokemonAbilitiesElement.classList.remove(currentClassType);
           }
           // Debo agregar la nueva información de habilidades y movimientos
           containers.pokemonMovesElement.classList.add(firstClass);
           containers.pokemonAbilitiesElement.classList.add(firstClass);
           currentClassType = firstClass;
   
           // Agrego las etiquetas que se crearon nuevas en el html
           containers.pokemonTypesContainer.innerHTML = pokemonType;
       };
   
       // Vamos a obtener las estadísticas del pokemon
       const processPokemonStats = (pokemonData) => {
           // Lo que vamos hacer es una función que se encargue de ir iterando sobre cada
           // uno de los datos que existen en la api, para ello ocupamos un forEach, pero
           // vamos a preguntar dentro de la iteración si es del pokemon que estamos buscando
           pokemonData?.forEach((pokemonStatData) => {
               // Aquí tenemos que evaluar si es el nombre del pokemon obtener sus valores 
               // pero los tenemos que incorporar en su contenedor y agregar los elementos
               switch(pokemonStatData.stat.name){
                   case "hp":
                       pokemonStatsElements.hp.innerHTML = pokemonStatData.base_stat;
                       pokemonStatsElements.hp.style = `background: linear-gradient(0deg, rgba(0,118,255,1) ${pokemonStatData.base_stat}%, rgba(0,0,0,1) ${pokemonStatData.base_stat}%);`;
                       break;
                   case "attack":
                       pokemonStatsElements.attack.innerHTML = pokemonStatData.base_stat;
                       pokemonStatsElements.attack.style = `background: linear-gradient(0deg, rgba(0,118,255,1) ${pokemonStatData.base_stat}%, rgba(0,0,0,1) ${pokemonStatData.base_stat}%);`;
                       break;
                   case "defense":
                       pokemonStatsElements.defense.innerHTML = pokemonStatData.base_stat;
                       pokemonStatsElements.defense.style = `background: linear-gradient(0deg, rgba(0,118,255,1) ${pokemonStatData.base_stat}%, rgba(0,0,0,1) ${pokemonStatData.base_stat}%);`;
                       break;
                   case "special-attack":
                       pokemonStatsElements.specialAttack.innerHTML = pokemonStatData.base_stat;
                       pokemonStatsElements.specialAttack.style = `background: linear-gradient(0deg, rgba(0,118,255,1) ${pokemonStatData.base_stat}%, rgba(0,0,0,1) ${pokemonStatData.base_stat}%);`;
                       break;
                   case "special-defense":
                       pokemonStatsElements.specialDefense.innerHTML = pokemonStatData.base_stat;
                       pokemonStatsElements.specialDefense.style = `background: linear-gradient(0deg, rgba(0,118,255,1) ${pokemonStatData.base_stat}%, rgba(0,0,0,1) ${pokemonStatData.base_stat}%);`;
                       break;
                   case "speed":
                       pokemonStatsElements.speed.innerHTML = pokemonStatData.base_stat;
                       pokemonStatsElements.speed.style = `background: linear-gradient(0deg, rgba(0,118,255,1) ${pokemonStatData.base_stat}%, rgba(0,0,0,1) ${pokemonStatData.base_stat}%);`;
                       break;
               }
           });
       };
       // Vamos a crear una función que se encargue de obtener los movimientos y colocarlos
       // en su contenedor
       const processPokemonMoves = (pokemonData) => {
           let pokemonMovesContent = "";
           pokemonData.moves.forEach((pokemonMove) => {
               pokemonMovesContent += `<li>${pokemonMove.move.name}</li>`;
           });
           containers.pokemonMovesElement.innerHTML = pokemonMovesContent;
       };
       // Vamos a crear una función que se encargue de obtener las habilidades y colocarlos
       // en su contenedor
       const processPokemonAbilities = (pokemonData) => {
           let pokemonAbilitiesContent = "";
           pokemonData.abilities.forEach((pokemonAbility) => {
               pokemonAbilitiesContent += `<li>${pokemonAbility.ability.name}</li>`;
           });
           containers.pokemonAbilitiesElement.innerHTML = pokemonAbilitiesContent;
       };
       // Vamos a crear una función para la carga de la imagen y deshabilitar los botones
       const setLoading = () => {
           containers.imageContainer.innerHTML = imageTemplate.replace("{imgSrc}", images.imgLoading);
           buttons.all.forEach(button => button.disabled = true);
       };
       // Vamos a crear una función para volver a habilitar los botones
       const setLoadingComplete = () => {
           buttons.all.forEach(button => button.disabled = false);
           checkDisabled(buttons.previous);
       };
       /*
       Tenemos que crear una función mediante la cual podamos realizar una peticion y mientras esta obteniendo la informacion por partes esperemos su respuesta, para eso nos sirve una función fetch, ya que esta función tiene la facultad de poder cargar archivos de forma local, fetch recibe una url del recurso o destino de la peticion y establece un objeto que nos ayuda a obtener algunos parametros.
       fetch devuelve una promesa, las promesas como su nombre lo dicen son funciones mediante las cuales nosotros hacemos una peticion, entonces debemos esperar un tiempo x para la respuesta, significa que la peticion se sigue procesando en un tiempo desconocido pero se asegura que va a existir una respuesta es por eso que fetch tiene un then y un catch, entonces nosotros debemos crear una funcion mediante un objeto de json podamos obtener toda la informacion que tenemos en las funciones anteriores y puede ser que lo primero que encuentre sea las habilidades, o las estadisticas o los movimientos, no imporque obtenga primero sino que al momento de realizar la peticion tendremos una promesa de una respuesta
       */
       const getPokemonData = async (pokemonName) => {
           try {
               const response = await fetch(`${pokeApiUrl}/pokemon/${pokemonName}`);
               if (!response.ok) {
                   throw new Error('Network response was not ok.');
               }
               return await response.json();
           } catch (error) {
               console.error('Error fetching data:', error);
               return null;
           }
       };
   
       // Tenemos que ver si se debe deshabilitar los botones o no, en caso solo se necesita deshabilitar el botón inferior ya que no existen pokemones con id negativo
       const checkDisabled = (button) => {
           button.disabled = button.id === "btnDown" && containers.pokemonIdElement.value <= 1;
       };
       // Vamos hacer la función cuya promesa es obtener todos los datos del pokemon
       const setPokemonData = async (pokemonName) => {
           if (pokemonName) {
               // Primero ponemos la imagen de la búsqueda y deshabilitamos los botones para la consulta
               setLoading();
               // Realizamos la consulta
               const pokemonData = await getPokemonData(typeof pokemonName === 'string' ? pokemonName.toLowerCase() : pokemonName);
               if (pokemonData) {
                   // Si encontramos el pokemon, colocamos la imagen y el id del pokemon
                   containers.imageContainer.innerHTML = `${imageTemplate.replace("{imgSrc}", pokemonData.sprites.front_default)} ${imageTemplate.replace("{imgSrc}", pokemonData.sprites.front_shiny)}`;
                   // Colocamos los datos: nombre, id, tipo, estadísticas, movimientos y habilidades
                   containers.pokemonNameElement.innerHTML = pokemonData.name;
                   containers.pokemonIdElement.innerHTML = pokemonData.id;
                   processPokemonTypes(pokemonData);
                   processPokemonStats(pokemonData.stats);
                   processPokemonMoves(pokemonData);
                   processPokemonAbilities(pokemonData);
               } else {
                   // Si no se encontró el pokemon, colocamos la imagen de no encontrado
                   containers.imageContainer.innerHTML = imageTemplate.replace("{imgSrc}", images.imgPokemonNotFound);
               }
               // Habilitamos los botones nuevamente
               setLoadingComplete();
           } else {
               // Mostramos una alerta de error si no se ingresó ningún nombre de pokemon
               alert("Por favor, ingresa el nombre de un pokemon primero");
           }
       };
   
       // Vinculamos la función de búsqueda al botón de búsqueda
       buttons.search.onclick = () => setPokemonData(pokemonInput.value);
       // Vinculamos la función de búsqueda al campo de texto para buscar precionando enter
       pokemonInput.onkeyup = (event) => {
           event.preventDefault();
           if (event.key === "Enter") {
               setPokemonData(pokemonInput.value);
           }
       };
       // Vinculamos las funciones de búsqueda para cuando sea arriba o abajo 
       buttons.next.onclick = () => setPokemonData(+containers.pokemonIdElement.innerHTML + 1);
       buttons.previous.onclick = () => setPokemonData(+containers.pokemonIdElement.innerHTML - 1);
   };
   
   // Ejecutamos el código cuando la ventana está completamente cargada
   window.onload = pokedex;
   