document.getElementById('calculateBtn').addEventListener('click', function() {
    const canvas = document.getElementById("gaussianCanvas");
    const ctx = canvas.getContext("2d");

    const width = canvas.width;
    const height = canvas.height;

    // Переменные
    /* const ei = 0.006; // мм
    const es = 0.055; // мм
    const x = 0.026; // мм
    const Sigma = 0.012; // мм */

    const ei = document.getElementById('ei').value;
    const es = document.getElementById('es').value;
    const x = document.getElementById('x').value;
    const Sigma = document.getElementById('sigma').value;


    // Связь с пикселями
    const pixelsPerMm = 5000; // Масштаб: 5000 единиц
    const xOffset = width / 2; // Смещаем "0" в середину canvas
    const amplitude = height * 0.7; // Высота графика

    // Функция плотности нормального распределения
    function gaussian(x, mean, stdDev) {
        return (
            amplitude * Math.exp(-0.5 * Math.pow((x - mean) / stdDev, 2))
        );
    }

    // Рисуем оси
    ctx.strokeStyle = "#aaa";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, height - 20); // Горизонтальная ось
    ctx.lineTo(width, height - 20);
    ctx.stroke();

    ctx.moveTo(xOffset, 0); // Вертикальная ось (центр canvas)
    ctx.lineTo(xOffset, height);
    ctx.stroke();
    ctx.closePath();

    ctx.moveTo(xOffset - (x * 1000 * 4), 0); // Вертикальная ось (центр canvas)
    ctx.lineTo(xOffset - (x * 1000 * 4), height);
    ctx.stroke();
    ctx.closePath();

    ctx.moveTo((xOffset - (x * 1000 * 4)) + (ei * 1000 * 4), 0); // Вертикальная ось (центр canvas)
    ctx.lineTo((xOffset - (x * 1000 * 4)) + (ei * 1000 * 4), height);
    ctx.stroke();
    ctx.closePath();

    ctx.moveTo((xOffset - (x * 1000 * 4)) + (es * 1000 * 4), 0); // Вертикальная ось (центр canvas)
    ctx.lineTo((xOffset - (x * 1000 * 4)) + (es * 1000 * 4), height);
    ctx.stroke();
    ctx.closePath();

    ctx.moveTo(xOffset - (3 * (Sigma * 1000 * 4) - x), 0); // Вертикальная ось (центр canvas)
    ctx.lineTo(xOffset - (3 * (Sigma * 1000 * 4) - x), height);
    ctx.stroke();
    ctx.closePath();

    ctx.moveTo(xOffset + (3 * (Sigma * 1000 * 4) - x), 0); // Вертикальная ось (центр canvas)
    ctx.lineTo(xOffset + (3 * (Sigma * 1000 * 4) - x), height);
    ctx.stroke();
    ctx.closePath();

    // Пометка точки "0"
    ctx.fillStyle = "#ff0000"; // Красная точка для отметки
    ctx.font = "12px Arial";
    ctx.fillText("0", xOffset - (x * 1000 * 4), height - 5); // Точка "0" на горизонтальной оси
    ctx.beginPath();
    ctx.arc(xOffset - (x * 1000 * 4), height - 20, 3, 0, 2 * Math.PI); // Рисуем точку "0"
    ctx.fill();

    // Не исправимый брак
    /* ctx.fillStyle = "#480607"; // Красная точка для отметки
    ctx.font = "14px Arial";
    ctx.fillText("Не исправимый брак", 5, 18); // Точка "0" на горизонтальной оси
    ctx.beginPath();
    ctx.arc(xOffset - (x * 1000 * 4), height - 20, 3, 0, 2 * Math.PI); // Рисуем точку "0"
    ctx.fill(); */

    // Пометка точки "ei"
    const eiPixel = (xOffset - (x * 1000 * 4)) + (ei * 1000 * 4);
    ctx.fillStyle = "#ff0000";
    ctx.font = "12px Arial";
    ctx.fillText(`ei = ${ei}`, eiPixel, height - 5);
    ctx.beginPath();
    ctx.arc(eiPixel, height - 20, 3, 0, 2 * Math.PI);
    ctx.fill();

    // Пометка точки "es"
    const esPixel = (xOffset - (x * 1000 * 4)) + (es * 1000 * 4);
    ctx.fillStyle = "#ff0000";
    ctx.font = "12px Arial";
    ctx.fillText(`es = ${es}`, esPixel, height - 5);
    ctx.beginPath();
    ctx.arc(esPixel, height - 20, 3, 0, 2 * Math.PI);
    ctx.fill();

    // Пометка точки "-3σ"
    ctx.fillStyle = "#ff0000"; // Красная точка для отметки
    ctx.font = "12px Arial";
    ctx.fillText("-3σ", xOffset - (3 * (Sigma * 1000 * 4) - x), height - 55); // Точка "-3σ"
    ctx.beginPath();
    ctx.arc(xOffset - (3 * (Sigma * 1000 * 4) - x), height - 20, 3, 0, 2 * Math.PI); // Рисуем точку "-3σ"
    ctx.fill();

    // Пометка точки "+3σ"
    ctx.fillStyle = "#ff0000";
    ctx.font = "12px Arial";
    ctx.fillText("+3σ", xOffset + (3 * (Sigma * 1000 * 4) - x), height - 55); // Точка "+3σ"
    ctx.beginPath();
    ctx.arc(xOffset + (3 * (Sigma * 1000 * 4) - x), height - 20, 3, 0, 2 * Math.PI); // Рисуем точку "+3σ"
    ctx.fill();

    // Рисуем гауссову кривую
    ctx.strokeStyle = "#6C63FF";
    ctx.lineWidth = 2;
    ctx.beginPath();

    for (let i = 0; i <= width; i++) {
        const realX = (i - xOffset) / pixelsPerMm; // Преобразуем пиксели в мм относительно "0"
        const y = gaussian(realX, 0, Sigma); // x = 0 (сдвиг на "0")
        ctx.lineTo(i, height - 20 - y); // Смещаем Y вверх от нижней границы
    }

    ctx.stroke();
    ctx.closePath();

    // Штриховка: от начала графика до точки ei
    ctx.fillStyle = "#FFDB8B";
    ctx.beginPath();
    ctx.moveTo(0, height - 20); // Начало
    for (let i = 0; i <= eiPixel; i++) {
        const realX = (i - xOffset) / pixelsPerMm;
        const y = gaussian(realX, 0, Sigma);
        ctx.lineTo(i, height - 20 - y);
    }
    ctx.lineTo(eiPixel, height - 20); // Спуститься вниз к оси
    ctx.lineTo(0, height - 20); // Вернуться в начало
    ctx.closePath();
    ctx.fill();

    // Штриховка: от точки es до конца графика
    ctx.fillStyle = "#89AC76";
    ctx.beginPath();
    ctx.moveTo(esPixel, height - 20); // Начало штриховки
    for (let i = esPixel; i <= width; i++) {
        const realX = (i - xOffset) / pixelsPerMm;
        const y = gaussian(realX, 0, Sigma);
        ctx.lineTo(i, height - 20 - y);
    }
    ctx.lineTo(width, height - 20); // Спуститься вниз к оси
    ctx.lineTo(esPixel, height - 20); // Вернуться в начало
    ctx.closePath();
    ctx.fill();

})