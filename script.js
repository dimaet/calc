document.getElementById('calculateBtn').addEventListener('click', function() {
    const ei = document.getElementById('ei').value;
    const es = document.getElementById('es').value;
    const x = document.getElementById('x').value;
    const sigma = document.getElementById('sigma').value;

    const z1 = (es-x)/sigma;
    const z2 = (ei-x)/sigma;

    // метод суммы Римана 

    function F(b) {
    const func = (z) => (1 / Math.sqrt(2 * Math.PI)) * Math.pow(Math.exp(1), -(z * z) / 2);
    const a = 0
    const n = 10000;
    const dx = (b - a) / n;
    let sum = 0;
    for (let i = 0; i < n; i++) {
        const xi = a + i * dx;
        sum += func(xi) * dx;
    }
    return sum;
    }

    if (ei && es && x && sigma) {
        // Расчет z-значений
        const z3 = (x - 3 * sigma - x) / sigma; // Неисправимый брак
        const z4 = (x + 3 * sigma - x) / sigma; // Исправимый брак
        
        // Получение значений и расчет процентов
        const zr1 = F(z1).toFixed(3); // Годные детали
        const zr2 = F(z2).toFixed(3); // Бракованные детали
        const zr3 = F(z3).toFixed(3); // Неисправимый брак
        const zr4 = ((F(z1) - F(z2)) * 100).toFixed(2); // Процент годных к бракованным
        const zr5 = ((F(z2) - F(z3)) * 100).toFixed(2); // Процент бракованных к неисправимым
        const zr6 = ((F(z4) - F(z1)) * 100).toFixed(2); // Процент исправимых к годным
    
        document.getElementById('result1').innerHTML = `Количество годных деталей: ${zr1} - ${zr2} = <strong>${zr4}</strong> %`;
        document.getElementById('result2').innerHTML = `Количество неисправимого брака: ${zr2} - ${zr3} = <strong>${zr5}</strong> %`;
        document.getElementById('result3').innerHTML = `Количество исправимого брака: ${zr6} - ${zr1} = <strong>${zr6}</strong> %`;
    } else {
        alert('Заполните все поля!');
    }
});

function checkButtonState() {
    const inputFields = Array.from(document.querySelectorAll('.input-field'));
    const calculateBtn = document.getElementById('calculateBtn');
    
    const allFieldsFilled = inputFields.length === 4 && inputFields.every(field => {
        const value = field.value.trim();
        return value !== '' && !isNaN(Number(value)); // Проверка на число
    });

    calculateBtn.classList.toggle('disabled', !allFieldsFilled);
    calculateBtn.disabled = !allFieldsFilled; 
}

// Функция валидации ввода
function validateInput(input) {
    const alertBox = document.getElementById('alert');
    const value = input.value.trim();

    if (value === '') {
        input.classList.remove('error');
        alertBox.style.display = 'none';
    } else {
        const isValid = !isNaN(value);
        input.classList.toggle('error', !isValid);
        alertBox.style.display = isValid ? 'none' : 'block';
    }

    checkButtonState();
}

function initializeInputFields() {
    const storage = {
        get: key => localStorage.getItem(key),
        set: (key, value) => localStorage.setItem(key, value),
        remove: key => localStorage.removeItem(key),
        clear: () => localStorage.clear(),
        loadValues: fields => {
            fields.forEach(field => {
                const savedValue = storage.get(field.id);
                if (savedValue) field.value = savedValue;
            });
        },
        resetValues: fields => {
            fields.forEach(field => {
                field.value = '';
                storage.remove(field.id);
            });
        }
    };

    const inputFields = document.querySelectorAll('.input-field');
    const resetBtn = document.getElementById('resetBtn');
    storage.loadValues(inputFields);

    // Обработчик ввода для сохранения значений
    document.addEventListener('input', (event) => {
        const field = event.target.closest('.input-field');
        if (field) {
            validateInput(field);
            storage.set(field.id, field.value);
        }
    });
    
    resetBtn.addEventListener('click', () => storage.resetValues(inputFields));
}

window.addEventListener('DOMContentLoaded', initializeInputFields);

document.addEventListener('DOMContentLoaded', () => {
    const inputFields = document.querySelectorAll('.input-field');
    inputFields.forEach(field => {
        const savedValue = localStorage.getItem(field.id);
        if (savedValue) {
            field.value = savedValue;
        }
        validateInput(field);
    });
});