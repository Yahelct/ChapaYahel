
function encontrarNumeroMayor() {
    const number1 = parseFloat(document.getElementById('number1').value);
    const number2 = parseFloat(document.getElementById('number2').value);

    let numeroMayor;

    if (number1 > number2) {
        numeroMayor = number1;
    } else {
        numeroMayor = number2;
    }

    document.getElementById('result').innerText = `El número mayor es: ${numeroMayor}`;
}
