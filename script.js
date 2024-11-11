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

undoButton.addEventListener('click', () => {
    if (lines.length > 0) {
        const removedLine = lines.pop();  // 最後の線を削除

        if (isContinuousMode) {
            // 連続測定モードの場合、削除したラインの長さを合計から引く
            const removedLength = parseFloat(removedLine.label.replace("mm", ""));
            totalLength -= removedLength;
            output.innerText = `合計長さ: ${totalLength.toFixed(2)}mm`;
        }

        // ラベルを再生成
        document.querySelectorAll('.length-label').forEach(label => label.remove()); // すべてのラベルを削除
        redraw();  // 再描画
        lines.forEach(line => { // 各ラインに対するラベルを再生成
            createLengthLabel(line.startX, line.startY, line.endX, line.endY, line.label);
        });
    }
});

