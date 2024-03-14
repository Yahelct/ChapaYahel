window.addEventListener('DOMContentLoaded', function() {
    const divisaOrigen = document.getElementById('divisaOrigen').value.replace(/\s+/g, '_');
    document.getElementById('banderaOrigen').src = `banderas/${divisaOrigen}.png`;
});

document.getElementById('divisaOrigen').addEventListener('change', function() {
    const divisa = this.value.replace(/\s+/g, '_');
    document.getElementById('banderaOrigen').src = `banderas/${divisa}.png`; 
});

document.getElementById('divisaDestino').addEventListener('change', function() {
    const divisa = this.value.replace(/\s+/g, '_'); 
    document.getElementById('banderaDestino').src = `banderas/${divisa}.png`; 
});

document.getElementById('convertir').addEventListener('click', function() {
    const monto = document.getElementById('monto').value;
    const divisaOrigen = document.getElementById('divisaOrigen').value;
    const divisaDestino = document.getElementById('divisaDestino').value;

    convertirDivisas(monto, divisaOrigen, divisaDestino);
});

async function convertirDivisas(monto, divisaOrigen, divisaDestino) {
    const apiKey = 'c0abc24b1df8744a5b16253a'; // Aquí va tu API Key
    const url = `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${divisaOrigen}/${divisaDestino}/${monto}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.result === "success") {
            document.getElementById('resultado').innerText =
                `Conversion: ${monto} ${divisaOrigen} = ${data.conversion_result} ${divisaDestino}`;
        } else {
            document.getElementById('resultado').innerText = 'Ha ocurrido un error durante la conversión.';
        }
    } catch (error) {
        console.error('Error al realizar la solicitud:', error);
        document.getElementById('resultado').innerText = 'Cantidad No Valida "INGRESE VALORES POSITIVOS"';
    }
}
