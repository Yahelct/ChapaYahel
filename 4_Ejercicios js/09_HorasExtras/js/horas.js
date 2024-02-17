
function calcularPago() {
    const normalHours = parseInt(document.getElementById('normalHours').value);
    const extraHours = parseInt(document.getElementById('extraHours').value);
    const hourlyRate = parseFloat(document.getElementById('hourlyRate').value);

    let pagoTotal;

    if (extraHours <= 8) {
        pagoTotal = (normalHours * hourlyRate) + (extraHours * 2 * hourlyRate);
    } else {
        const primeras8HorasExtras = 8 * 2 * hourlyRate;
        const horasExtrasRestantes = (extraHours - 8) * 3 * hourlyRate;
        pagoTotal = (normalHours * hourlyRate) + primeras8HorasExtras + horasExtrasRestantes;
    }

    document.getElementById('result').innerText = `El pago total es: ${pagoTotal.toFixed(2)}`;
}
