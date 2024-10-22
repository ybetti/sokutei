// 線の情報を保持する配列
let lines = [];

// マウスイベントハンドラー
document.getElementById('image-container').addEventListener('mousedown', startDrawing);
document.getElementById('image-container').addEventListener('mousemove', drawLine);
document.getElementById('image-container').addEventListener('mouseup', endDrawing);

document.getElementById('uploadButton').addEventListener('click', function() {
    document.getElementById('fileInput').click();
});

document.getElementById('fileInput').addEventListener('change', function(e) {
    const file = e.target.files;
    const reader = new FileReader();
    reader.onload = function(event) {
        document.getElementById('selectedImage').src = event.target.result;
    };
    reader.readAsDataURL(file);
});

// 線の描画を開始
function startDrawing(e) {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    lines.push({ start: { x, y }, end: { x, y } });
    drawLines();
}

// 線の描画中
function drawLine(e) {
    if (lines.length === 0) return;
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    lines[lines.length - 1].end = { x, y };
    drawLines();
}

// 線の描画を終了
function endDrawing() {
    calculateLengths();
}

// 線を描画
function drawLines() {
    const container = document.getElementById('image-container');
    container.innerHTML = '<img id="image" src="your-image-url.jpg" alt="測定画像">';
    lines.forEach((line, index) => {
        const lineElement = document.createElement('div');
        lineElement.className = 'line';
        lineElement.style.left = `${line.start.x}px`;
        lineElement.style.top = `${line.start.y}px`;
        lineElement.style.width = `${Math.abs(line.end.x - line.start.x)}px`;
        lineElement.style.transform = `rotate(${Math.atan2(line.end.y - line.start.y, line.end.x - line.start.x) * 180 / Math.PI}deg)`;
        container.appendChild(lineElement);
    });
}

// 線の長さを計算して表示
function calculateLengths() {
    const firstLineLength = Math.sqrt(Math.pow(lines.end.x - lines.start.x, 2) + Math.pow(lines.end.y - lines.start.y, 2));
    const scale = 1 / firstLineLength; // 1mm = firstLineLength pixel

    lines.forEach((line, index) => {
        const length = Math.sqrt(Math.pow(line.end.x - line.start.x, 2) + Math.pow(line.end.y - line.start.y, 2));
        const lengthInMM = length * scale;
        console.log(`線${index + 1}の長さ: ${lengthInMM.toFixed(2)}mm`);
        if (index > 0) {
            console.log(`線${index + 1}は線1の${(lengthInMM / firstLineLength * scale).toFixed(2)}倍`);
        }
    });
}
