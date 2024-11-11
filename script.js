// 画像を縮小して描画
function resizeImage(image, scaleFactor) {
    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');
    tempCanvas.width = image.width * scaleFactor;
    tempCanvas.height = image.height * scaleFactor;
    tempCtx.drawImage(image, 0, 0, tempCanvas.width, tempCanvas.height);
    return tempCanvas;
}

// 画像のonloadイベントで縮小した画像を描画する
image.onload = () => {
    const scaleFactor = 0.5; // 50%のサイズに縮小
    const resizedCanvas = resizeImage(image, scaleFactor);
    canvas.width = resizedCanvas.width;
    canvas.height = resizedCanvas.height;
    ctx.drawImage(resizedCanvas, 0, 0);
};

let isShiftPressed = false;
let isVerticalMode = false;

// Shiftキーの押下状態を検出
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

// 垂直モードの切り替えボタン
const toggleVerticalModeButton = document.getElementById('toggleVerticalModeButton');
toggleVerticalModeButton.addEventListener('click', () => {
    isVerticalMode = !isVerticalMode;
    toggleVerticalModeButton.textContent = 垂直モード: ${isVerticalMode ? 'オン' : 'オフ'};
});

canvas.addEventListener('mousedown', (e) => {
    if (isDrawing) {
        let endX = e.offsetX;
        let endY = e.offsetY;

        // Shiftキーが押されているか垂直モードがオンの場合は垂直線を描画
        if (isShiftPressed || isVerticalMode) {
            endX = startX;  // X座標を固定して垂直に
        }

        const length = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
        
        // 以下は長さの計算および描画ロジック
        // ...
        
        isDrawing = false;
    } else {
        startX = e.offsetX;
        startY = e.offsetY;
        isDrawing = true;
    }
});
