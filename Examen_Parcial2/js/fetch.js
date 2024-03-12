
function convertir() {
    var amount = document.getElementById('amount').value;
    var from = document.getElementById('from').value;
    var to = document.getElementById('to').value;

    if (amount < 0) {
        document.getElementById('resultado').innerHTML = "Error: No se pueden convertir números negativos";
        return;
    }

    fetch(`https://api.exchangerate-api.com/v4/latest/${from}`)
        .then(response => response.json())
        .then(data => {
            var conversionRate = data.rates[to];
            var resultado = amount * conversionRate;
            var formattedResult = resultado.toFixed(2);
            document.getElementById('resultado').innerHTML = `${amount} ${from} = ${formattedResult} ${to}`;
        })
        .catch(error => console.error('Error al obtener el tipo de cambio:', error));
}
