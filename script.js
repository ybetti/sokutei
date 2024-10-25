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
