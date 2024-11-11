// 画像縮小用関数
function resizeImage(image, scaleFactor) {
    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');
    tempCanvas.width = image.width * scaleFactor;
    tempCanvas.height = image.height * scaleFactor;
    tempCtx.drawImage(image, 0, 0, tempCanvas.width, tempCanvas.height);
    return tempCanvas;
}

// 画像読み込み時に縮小画像を描画
image.onload = () => {
    const scaleFactor = 0.5;
    const resizedCanvas = resizeImage(image, scaleFactor);
    canvas.width = resizedCanvas.width;
    canvas.height = resizedCanvas.height;
    ctx.drawImage(resizedCanvas, 0, 0);
};

let isShiftPressed = false;
let isVerticalMode = false;

// Shiftキーの押下状態を監視
document.addEventListener('keydown', (e) => {
    if (e.key === 'Shift') {
        isShiftPressed = true;
    }
});

document.addEventListener('keyup', (e) => {
    if (e.key === 'Shift') {
        isShiftPressed = false;
    }
});

// 垂直モード切り替えボタン
const toggleVerticalModeButton = document.getElementById('toggleVerticalModeButton');
toggleVerticalModeButton.addEventListener('click', () => {
    isVerticalMode = !isVerticalMode;
    toggleVerticalModeButton.textContent = `垂直モード: ${isVerticalMode ? 'オン' : 'オフ'}`;
});

// 描画処理
canvas.addEventListener('mousedown', (e) => {
    if (isDrawing) {
        let endX = e.offsetX;
        let endY = e.offsetY;

        // Shiftキーまたは垂直モードの場合、X座標を固定して垂直線を描画
        if (isShiftPressed || isVerticalMode) {
            endX = startX;
        }

        const length = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));

        // 必要な長さ計算および描画の処理
        lines.push({ x1: startX, y1: startY, x2: endX, y2: endY, length: length });
        redraw();

        isDrawing = false;
    } else {
        startX = e.offsetX;
        startY = e.offsetY;
        isDrawing = true;
    }
});

// 長さラベルを作成する関数
function createLengthLabel(startX, startY, endX, endY, length, totalLength) {
    console.log("Creating length label");  // デバッグ用

    const ratio = baseLineLength === null ? 0 : length / baseLineLength;
    const label = document.createElement('div');
    label.className = 'length-label';
    
    // 線の長さと合計長さの表示
    label.innerText = `${isContinuousMode ? totalLength.toFixed(2) : ratio.toFixed(2)}mm`;
    
    document.body.appendChild(label);
    
    // ラベル位置の計算
    const midX = (startX + endX) / 2;
    const midY = (startY + endY) / 2;
    label.style.left = `${canvas.offsetLeft + midX}px`;
    label.style.top = `${canvas.offsetTop + midY - 20}px`;

    console.log(`Label position: left=${label.style.left}, top=${label.style.top}`); // デバッグ用

    // ドラッグ用のイベントリスナーを追加
    label.addEventListener('mousedown', (e) => {
        isDragging = true;
        currentLabel = label;
        dragOffsetX = e.clientX - label.offsetLeft;
        dragOffsetY = e.clientY - label.offsetTop;
    });

    document.addEventListener('mousemove', (e) => {
        if (isDragging && currentLabel) {
            currentLabel.style.left = `${e.clientX - dragOffsetX}px`;
            currentLabel.style.top = `${e.clientY - dragOffsetY}px`;
        }
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
        currentLabel = null;
    });

    return label;
}

