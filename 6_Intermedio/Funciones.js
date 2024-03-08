
var x = "y";
var x = "x";
if (true){
    let x = "x";
    console.log(x);
}
console.log(x);

//FUNCIONES
/* EJEMPLO 1
function sumarFuncionNormal(n1, n2){
    return n1+n2;
}
console.log('Vamos a sumar 4 y 5: $(sumarFuncionNormal(3,5)}');
*/

/* EJEMPLO 2
function sumarFuncionNormal(n1, n2){
    return n1+n2;
}
console.log('Vamos a sumar 7 y 5: $(sumarFuncionNormal(7,5)}' );
*/

// VARIABLE
const razasdePerro = [
    "Gran Danes",
    "Pastor Aleman",
    "Chihuagua",
    "Belga",
    "Pitbull",
    "Dalmata",
    "San berbardo"
]

/* ARREGLO
for (let indice = 0; indice < razasdePerro.length; indice++) {
    console.log(razasdePerro[indice]);
}
*/

/* for of
for (const raza of razasdePerro){
    console.log(raza);
}
*/

/* For in
for (const indice in razasdePerro) {
    console.log(razasdePerro);
    // const.log(razasdePerro[indice]);
}
*/

/* forEach  Sirve para iterar sobre los elementos del arreglo, recorriéndolos uno por uno. No devuelve nada y en realidad es una función flecha

razasdePerro.forEach((raza, indice, arregloOriginal) => console.log(raza));

razasdePerro.forEach((raza) => console.log(raza));

//funcion MAP Sirve para iterar sobre los elementos de un arreglo y regresar un arrglo diferente con el cual se pueden hacer operaciones

const razasdePerroEnMayusculas = razasdePerro.map((raza)=>console.log(raza.toUpperCase())); 

*/

// FIND nos permite buscar un elmento dentro del arreglo y si lo encuentra lo regresa y sino lanza un "undefinend"

if(razasdePerro.find((raza) => raza === "Pug")){
    console.log("La raza se encuentra en el arreglo");
    console.log(razasdePerro);
}else{
    //hay que meterlo
    razasdePerro.push("Pug");
    console.log(razasdePerro);
}

// FINDINDEX

const indiceChihuahua = razasdePerro.findIndex((raza)=> raza === "Chihuahua");

if(indiceChihuahua > -1){
    console.log(razasdePerro[indiceChihuahua]);
    //aparte voy agregar que diga que la raza es pequeña
    razasdePerro[indiceChihuahua] += "(Raza de pequeña de perro)";
    console.log(razasdePerro[indiceChihuahua]);
    //diferencia sin el indice
    console.log(razasdePerro);
}else{
    console.log("No esta esa raza");
}