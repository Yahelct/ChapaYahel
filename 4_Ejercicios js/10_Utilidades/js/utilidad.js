
function calcularUtilidades() {
    const salary = parseFloat(document.getElementById('salary').value);
    const yearsOfWork = parseInt(document.getElementById('yearsOfWork').value);

    let porcentajeUtilidad;

    if (yearsOfWork < 1) {
        porcentajeUtilidad = 0.05;
    } else if (yearsOfWork >= 1 && yearsOfWork < 2) {
        porcentajeUtilidad = 0.07;
    } else if (yearsOfWork >= 2 && yearsOfWork < 5) {
        porcentajeUtilidad = 0.10;
    } else if (yearsOfWork >= 5 && yearsOfWork < 10) {
        porcentajeUtilidad = 0.15;
    } else {
        porcentajeUtilidad = 0.20;
    }

    const utilidades = salary * porcentajeUtilidad;

    document.getElementById('result').innerText = `La cantidad de utilidades es: ${utilidades.toFixed(2)}`;
}
