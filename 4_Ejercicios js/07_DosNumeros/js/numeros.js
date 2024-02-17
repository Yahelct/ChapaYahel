
function realizarOperacion() {
    const number1 = parseFloat(document.getElementById('number1').value);
    const number2 = parseFloat(document.getElementById('number2').value);

    let resultado;

    if (number1 === number2) {
        resultado = number1 * number2;
    } else if (number1 > number2) {
        resultado = number1 - number2;
    } else {
        resultado = number1 + number2;
    }

    document.getElementById('result').innerText = `El resultado es: ${resultado}`;
}
