// ドラッグ関連の変数
let isDragging = false;
let dragTarget = null;
let offsetX = 0;
let offsetY = 0;

function createLengthLabel(startX, startY, endX, endY, labelText) {
    const label = document.createElement('div');
    label.className = 'length-label';
    label.innerText = labelText; // ラベルに表示するテキストを設定
    document.body.appendChild(label);

    // ラベルの位置を線の中間地点に設定
    const midX = (startX + endX) / 2;
    const midY = (startY + endY) / 2;
    label.style.left = `${canvas.offsetLeft + midX}px`;
    label.style.top = `${canvas.offsetTop + midY - 20}px`;

    // ラベルのドラッグ開始
    label.addEventListener('mousedown', (e) => {
        e.preventDefault(); // デフォルトの選択動作を防ぐ
        isDragging = true;
        dragTarget = label;
        // マウスクリック位置とラベル位置のオフセットを記録
        offsetX = e.clientX - label.getBoundingClientRect().left;
        offsetY = e.clientY - label.getBoundingClientRect().top;
    });
}

// ドラッグ中のラベルの移動
document.addEventListener('mousemove', (e) => {
    if (isDragging && dragTarget) {
        e.preventDefault(); // 不要な選択操作を防ぐ
        dragTarget.style.left = `${e.clientX - offsetX}px`;
        dragTarget.style.top = `${e.clientY - offsetY}px`;
    }
});

// ドラッグ終了
document.addEventListener('mouseup', () => {
    isDragging = false;
    dragTarget = null;
});
