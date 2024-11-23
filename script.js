document.getElementById('calculateBtn').addEventListener('click', function() {
    const ei = document.getElementById('ei').value;
    const es = document.getElementById('es').value;
    const x = document.getElementById('x').value;
    const sigma = document.getElementById('sigma').value;

    var z1 = (es-x)/sigma;
    var z2 = (ei-x)/sigma;

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

    // определение количества годных деталей

    console.log( "Количество годных деталей: ", F(z1).toFixed(3), "-", F(z2).toFixed(3), "=", ((F(z1)-F(z2))*100).toFixed(2), "%");

    // определение неисправимого брака

    var z3 = (x - 3*sigma - x)/sigma;
    console.log( "Количество неисправимого брака: ", F(z2).toFixed(3), "-", F(z3).toFixed(3), "=", ((F(z2)-F(z3))*100).toFixed(2), "%");

    // определение исправимого брака

    var z4 = (x + 3*sigma - x)/sigma;
    console.log( "Количество исправимого брака: ", F(z4).toFixed(3), "-", F(z1).toFixed(3), "=", ((F(z4)-F(z1))*100).toFixed(2), "%");
        

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
    
        // Обновление текстового содержимого с жирным шрифтом
        document.getElementById('result1').innerHTML = `Количество годных деталей: ${zr1} - ${zr2} = <strong>${zr4}</strong> %`;
        document.getElementById('result2').innerHTML = `Количество неисправимого брака: ${zr2} - ${zr3} = <strong>${zr5}</strong> %`;
        document.getElementById('result3').innerHTML = `Количество исправимого брака: ${zr6} - ${zr1} = <strong>${zr6}</strong> %`;
    } else {
        alert('Заполните все поля!');
    }
});


function validateInput(input) {
    const alertBox = document.getElementById('alert');
    const inputFields = document.querySelectorAll('.input-field');
    const calculateBtn = document.getElementById('calculateBtn');
    
    // Проверка, является ли значение пустым или нечисловым
    if (input.value.trim() === '') {
        input.classList.remove('error'); // Убираем класс ошибки, если поле пустое
        alertBox.style.display = 'none'; // Скрываем сообщение
    } else if (isNaN(input.value)) {
        input.classList.add('error'); // Добавляем класс ошибки
        alertBox.style.display = 'block'; // Показываем сообщение
    } else {
        input.classList.remove('error'); // Убираем класс ошибки
        alertBox.style.display = 'none'; // Скрываем сообщение
    }
    
    // Проверка состояния всех полей ввода
    const allValid = Array.from(inputFields).every(field => field.value.trim() !== '' && !isNaN(field.value));

    // Проверка, что все 4 поля заполнены корректно
    const allFieldsFilled = inputFields.length === 4 && allValid;

    // Изменение стиля кнопки в зависимости от валидности полей ввода
    if (allFieldsFilled) {
        calculateBtn.classList.remove('disabled'); // Убираем класс "disabled"
        calculateBtn.disabled = false; // Разрешаем нажатие кнопки
    } else {
        calculateBtn.classList.add('disabled'); // Добавляем класс "disabled"
        calculateBtn.disabled = true; // Запрещаем нажатие кнопки
    }
}
