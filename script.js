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
