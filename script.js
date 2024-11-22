canvas.addEventListener('mousedown', (e) => {
    if (isDrawing) {
        let endX = e.offsetX;
        let endY = e.offsetY;

        if (isVerticalMode) endY = startY;

        const length = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
        const ratio = baseLineLength ? length / baseLineLength : 1.0;

        if (!baseLineLength) {
            baseLineLength = length;
            output.innerText = `基準長さを設定しました。1mm = ${length.toFixed(2)}px`;
        } else {
            if (isContinuousMode) {
                totalLength += ratio; // 合計長さを更新
                output.innerText = `合計長さ: ${totalLength.toFixed(2)}mm`;
            } else {
                output.innerText = `長さ: ${ratio.toFixed(2)}mm`;
            }
        }

        // ラインデータに合計長さを追加して保存
        lines.push({ 
            startX, 
            startY, 
            endX, 
            endY, 
            label: `${totalLength.toFixed(2)}mm` 
        });

        // ラベルを描画する際に合計を表示
        createLengthLabel(startX, startY, endX, endY, `${totalLength.toFixed(2)}mm`);

        isDrawing = false;
        redraw();
    } else {
        startX = e.offsetX;
        startY = e.offsetY;
        isDrawing = true;
    }
});

function createLengthLabel(startX, startY, endX, endY, labelText) {
    const label = document.createElement('div');
    label.className = 'length-label';
    label.innerText = labelText;
    document.body.appendChild(label);

    // ラベルの位置を線の中間地点に設定
    const midX = (startX + endX) / 2;
    const midY = (startY + endY) / 2;
    label.style.left = `${canvas.offsetLeft + midX}px`;
    label.style.top = `${canvas.offsetTop + midY - 20}px`;

    label.addEventListener('mousedown', (e) => {
        isDragging = true;
        dragTarget = label;
        offsetX = e.clientX - label.getBoundingClientRect().left;
        offsetY = e.clientY - label.getBoundingClientRect().top;
    });
}
