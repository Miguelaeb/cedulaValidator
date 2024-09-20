document.getElementById('cedulaForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const cedulaInput = document.getElementById('cedula').value.trim();
    const resultadoDiv = document.getElementById('resultado');

    if (validarFormatoCedula(cedulaInput)) {
        if (validarLuhn(cedulaInput)) {
            resultadoDiv.style.color = 'green';
            resultadoDiv.textContent = '¡Cédula válida!';
        } else {
            resultadoDiv.style.color = 'red';
            resultadoDiv.textContent = 'Cédula inválida según el algoritmo de Luhn.';
        }
    } else {
        resultadoDiv.style.color = 'red';
        resultadoDiv.textContent = 'Formato de cédula inválido. Debe tener 11 dígitos.';
    }
});

/**
 * Valida el formato de la cédula.
 * @param {string} cedula 
 * @returns {boolean}
 */
function validarFormatoCedula(cedula) {
    // Eliminar guiones si los hay
    const cedulaSinGuiones = cedula.replace(/-/g, '');
    // Verificar que tenga 11 dígitos
    const regex = /^\d{11}$/;
    return regex.test(cedulaSinGuiones);
}

/**
 * Algoritmo de Luhn para validar la cédula.
 * @param {string} cedula 
 * @returns {boolean}
 */
function validarLuhn(cedula) {
    // Eliminar guiones si los hay
    const cedulaSinGuiones = cedula.replace(/-/g, '');
    let suma = 0;
    let doble = false;

    // Iterar desde el último dígito hacia atrás
    for (let i = cedulaSinGuiones.length - 1; i >= 0; i--) {
        let num = parseInt(cedulaSinGuiones.charAt(i));

        if (doble) {
            num *= 2;
            if (num > 9) {
                num -= 9;
            }
        }

        suma += num;
        doble = !doble;
    }

    return suma % 10 === 0;
}
