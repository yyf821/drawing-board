const __main = function () {
    // 创建Canvas画布元素
    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");

    // 创建画板对象
    const drawingBoard = new DrawingBoard(canvas, context);

    const eraserButton = document.getElementById("eraser-button");
    eraserButton.addEventListener("click", () => {
        drawingBoard.setTool("eraser");
    });

    const rectButton = document.getElementById("rect-button");
    rectButton.addEventListener("click", () => {
        drawingBoard.setTool("rect");
    });

    const circleButton = document.getElementById("circle-button");
    circleButton.addEventListener("click", () => {
        drawingBoard.setTool("circle");
    });

    const penButton = document.getElementById("pen-button");
    penButton.addEventListener("click", () => {
        drawingBoard.setTool("pen");
    });

    const undoButton = document.getElementById("undo-button");
    undoButton.addEventListener("click", () => {
        drawingBoard.undo();
    });

    const redoButton = document.getElementById("redo-button");
    redoButton.addEventListener("click", () => {
        drawingBoard.redo();
    });

    const clearButton = document.getElementById("clear-button");
    clearButton.addEventListener("click", () => {
        drawingBoard.clear();
    });

    const downloadButton = document.getElementById("download-button");
    downloadButton.addEventListener("click", () => {
        drawingBoard.saveAsImage();
    });

    const color = document.getElementById("color");
    color.addEventListener("change", (event) => {
        drawingBoard.setLineColor(event.target.value);
    });

    const lineWidth = document.getElementById("line-width");
    lineWidth.addEventListener("change", (event) => {
        drawingBoard.setLineWidth(event.target.value);
    });

    document.addEventListener('keydown', function (event) {
        if (event.ctrlKey && event.code === 'KeyZ') {
            drawingBoard.undo();
        } else if (event.ctrlKey && event.code === 'KeyY') {
            drawingBoard.redo();
        }
    });
};
__main();
