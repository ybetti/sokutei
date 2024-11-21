let currentModeTotalLength = 0; // 連続測定モード中の合計長さ

toggleModeButton.addEventListener('click', () => {
    isContinuousMode = !isContinuousMode;
    toggleModeButton.textContent = `連続測定モード: ${isContinuousMode ? 'オン' : 'オフ'}`;

    if (!isContinuousMode) {
        // モードをオフにしたら合計ラベルを消去
        const existingLabel = document.getElementById('modeTotalLengthLabel');
        if (existingLabel) existingLabel.remove();
        currentModeTotalLength = 0; // 合計をリセット
    }
});

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
                totalLength += ratio;
                currentModeTotalLength += ratio; // モード中の合計を更新
                output.innerText = `合計長さ: ${totalLength.toFixed(2)}mm`;

                // 連続測定モード中の合計をラベル表示
                updateModeTotalLabel();
            } else {
                output.innerText = `長さ: ${ratio.toFixed(2)}mm`;
            }
        }

        lines.push({ startX, startY, endX, endY, label: `${ratio.toFixed(2)}mm` });
        lastLengthAdded = ratio;

        isDrawing = false;
        redraw();
    } else {
        startX = e.offsetX;
        startY = e.offsetY;
        isDrawing = true;
    }
});

function updateModeTotalLabel() {
    let label = document.getElementById('modeTotalLengthLabel');
    if (!label) {
        label = document.createElement('div');
        label.id = 'modeTotalLengthLabel';
        label.className = 'length-label';
        document.body.appendChild(label);
    }
    label.innerText = `連続測定合計: ${currentModeTotalLength.toFixed(2)}mm`;
    label.style.left = `${canvas.offsetLeft + 20}px`; // キャンバスの左上に表示
    label.style.top = `${canvas.offsetTop + 20}px`;
}
