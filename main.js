function selectButton(event) {
    // 重置所有按钮的选中状态
    const buttons = document.querySelectorAll(".toolbar__bottom .toolbar__btn");

    buttons.forEach(function (button) {
        button.classList.remove("toolbar__btn--selected");
    });

    // 设置当前按钮为选中状态
    const button = event.target;
    button.classList.add("toolbar__btn--selected");
}

const __main = function () {
    // 创建Canvas画布元素
    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");

    // 创建画板对象
    const drawingBoard = new DrawingBoard(canvas, context);

    const eraserButton = document.getElementById("eraser-button");
    eraserButton.addEventListener("click", (event) => {
        selectButton(event);
        drawingBoard.setTool("eraser");
    });

    const rectButton = document.getElementById("rect-button");
    rectButton.addEventListener("click", (event) => {
        selectButton(event);
        drawingBoard.setTool("rect");
    });

    const circleButton = document.getElementById("circle-button");
    circleButton.addEventListener("click", (event) => {
        selectButton(event);
        drawingBoard.setTool("circle");
    });

    const penButton = document.getElementById("pen-button");
    penButton.addEventListener("click", (event) => {
        selectButton(event);
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

    document.addEventListener("keydown", function (event) {
        if (event.ctrlKey && event.code === "KeyZ") {
            drawingBoard.undo();
        } else if (event.ctrlKey && event.code === "KeyY") {
            drawingBoard.redo();
        }
    });
};
__main();
