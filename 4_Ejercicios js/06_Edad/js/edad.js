
function calcularEdad() {
    const birthDate = new Date(document.getElementById('birthDate').value);
    const currentDate = new Date();

    const age = currentDate.getFullYear() - birthDate.getFullYear();

    if (currentDate.getMonth() < birthDate.getMonth() || 
        (currentDate.getMonth() === birthDate.getMonth() && currentDate.getDate() < birthDate.getDate())) {
        age--;
    }

    document.getElementById('result').innerText = `La edad es: ${age} años`;
}
