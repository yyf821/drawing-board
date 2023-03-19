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

// 生成颜色按钮的模板字符串
const colorButtonTemplate = (color) => `
<button class="color__btn" style="background-color: ${color.code}" title="${color.name}" data-code=${color.code}></button>
`;

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

    const pickerButton = document.getElementById("picker-button");
    pickerButton.addEventListener("click", (event) => {
        selectButton(event);
        drawingBoard.setTool("picker");
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

    const colorsContainer = document.getElementById("colors-container");

    // 颜色数组
    const colors = [
        { name: "黑色", code: "#000000" },
        { name: "红色", code: "#ff0000" },
        { name: "绿色", code: "#00ff00" },
        { name: "蓝色", code: "#0000ff" },
        { name: "黄色", code: "#ffff00" },
        { name: "紫色", code: "#800080" },
        { name: "白色", code: "#ffffff" },
        { name: "青色", code: "#00ffff" },
        { name: "橙色", code: "#ffa500" },
        { name: "粉红色", code: "#ffc0cb" },
        { name: "茶色", code: "#a52a2a" },
        { name: "灰色", code: "#808080" },
    ];

    const colorsHtml = colors.map(colorButtonTemplate).join("");
    colorsContainer.innerHTML = colorsHtml;
    colorsContainer.addEventListener("click", (event) => {
        const button = event.target;
        if (button.classList.contains("color__btn")) {
            const colorCode = button.getAttribute("data-code");
            // 调用setColor函数，并把颜色码作为参数传入
            drawingBoard.setLineColor(colorCode);
        }
    });
};
__main();
