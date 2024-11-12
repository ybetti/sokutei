let lastLengthAdded = 0; // 最後に追加された長さを保持

undoButton.addEventListener('click', () => {
    if (lines.length > 0) {
        const removedLine = lines.pop();  // 最後の線を削除

        if (isContinuousMode) {
            // 最後に追加された長さを合計から引く
            const removedLength = parseFloat(removedLine.label.replace("mm", ""));
            totalLength -= removedLength;
            output.innerText = `合計長さ: ${totalLength.toFixed(2)}mm`;
        }

        // ラベルを再生成
        document.querySelectorAll('.length-label').forEach(label => label.remove()); // すべてのラベルを削除
        redraw();  // 再描画
        lines.forEach(line => { // 各ラインに対するラベルを再生成
            const lineLength = parseFloat(line.label.replace("mm", ""));
            createLengthLabel(line.startX, line.startY, line.endX, line.endY, lineLength, totalLength);
        });
    }
});

canvas.addEventListener('mousedown', (e) => {
    if (isDrawing) {
        let endX = e.offsetX;
        let endY = e.offsetY;

        // 垂直モードがオンの時
