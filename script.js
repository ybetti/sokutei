let lastRemovedLength = 0; // 最後に削除した線の長さを保存する変数

undoButton.addEventListener('click', () => {
    if (lines.length > 0) {
        const removedLine = lines.pop();  // 最後の線を削除

        if (isContinuousMode) {
            // 削除した線の長さを取得し、合計から引く
            const removedLength = parseFloat(removedLine.label.replace("mm", ""));
            totalLength -= removedLength;  // 削除分を合計長さから引く
        }

        // 全てのラベルを削除し、再描画して累積長さを再計算
        document.querySelectorAll('.length-label').forEach(label => label.remove());
        redraw();

        // 累積長さをリセットし、各ラインのラベルを再生成
        let cumulativeLength = 0;
        lines.forEach(line => {
            const lineLength = parseFloat(line.label.replace("mm", ""));
            cumulativeLength += lineLength;
            createLengthLabel(line.startX, line.startY, line.endX, line.endY, lineLength, cumulativeLength);
        });

        // `totalLength` を更新して表示
        totalLength = cumulativeLength;
        if (isContinuousMode) {
            output.innerText = `合計長さ: ${totalLength.toFixed(2)}mm`;
        }
    }
});

canvas.addEventListener('mousedown', (e) => {
    if (isDrawing) {
        let endX = e.offsetX;
        let endY = e.offsetY;

        // 垂直モードがオンの時にX座標を固定
        if (isVerticalMode) {
            endX = startX;
        }

        const length = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
        const ratio = baseLineLength ? length / baseLineLength : 1; // 基準線がない場合は1.00mmとして表示

        if (!baseLineLength) {
            baseLineLength = length;
            output.innerText = `基準長さを設定しました。1mm = ${length.toFixed(2)}px`;
        } else {
            if (isContinuousMode) {
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
