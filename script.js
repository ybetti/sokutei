let lastRemovedLength = 0; // 最後に削除した線の長さを保存する変数

undoButton.addEventListener('click', () => {
    if (lines.length > 0) {
        const removedLine = lines.pop();  // 最後の線を削除

        // 連続測定モードの場合、削除したラインの長さを保持して合計長さから引く
        if (isContinuousMode) {
            lastRemovedLength = parseFloat(removedLine.label.replace("mm", ""));  // 削除した線の長さ
            totalLength -= lastRemovedLength;  // 削除した分を合計長さから引く
            output.innerText = `合計長さ: ${totalLength.toFixed(2)}mm`;
        }

        // ラベルを再生成
        document.querySelectorAll('.length-label').forEach(label => label.remove()); // すべてのラベルを削除
        redraw();  // 再描画

        // 各ラインに対するラベルを再生成
        lines.forEach((line, index) => {
            const lineLength = parseFloat(line.label.replace("mm", ""));
            if (isContinuousMode) {
                // 合計長さを再計算して正しい値を表示
                totalLength = lines.slice(0, index + 1).reduce((acc, curr) => acc + parseFloat(curr.label.replace("mm", "")), 0);
            }
            createLengthLabel(line.startX, line.startY, line.endX, line.endY, lineLength, totalLength);
        });
    }
});

canvas.addEventListener('mousedown', (e) => {
    if (isDrawing) {
        let endX = e.offsetX;
        let endY = e.offsetY;

        // 垂平モードがオンの時にX座標を固定
        if (isHorizonMode) {
            endY = startY;
        }

        const length = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
        const ratio = baseLineLength ? length / baseLineLength : 0;

        if (!baseLineLength) {
            baseLineLength = length;
            output.innerText = `基準長さを設定しました。1mm = ${length.toFixed(2)}px`;
        } else {
            if (isContinuousMode) {
                // 連続測定モードの場合、合計長さを更新
                totalLength += ratio;
                output.innerText = `合計長さ: ${totalLength.toFixed(2)}mm`;
            } else {
                output.innerText = `長さ: ${ratio.toFixed(2)}mm`;
            }
        }

        lines.push({ startX, startY, endX, endY, label: `${ratio.toFixed(2)}mm` });
        isDrawing = false;
        redraw();
    } else {
        startX = e.offsetX;
        startY = e.offsetY;
        isDrawing = true;
    }
});
