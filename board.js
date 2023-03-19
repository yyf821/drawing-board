// 定义画板类
class DrawingBoard {
    constructor(canvas, context) {
        this.canvas = canvas;
        this.context = context;
        this.mouseCoord = document.querySelector("#mouse-coords");
        this.currentColorEl = document.querySelector("#current-color");

        // 为Canvas绑定事件监听器
        canvas.addEventListener("mousedown", this.onMouseDown);
        canvas.addEventListener("mousemove", this.onMouseMove);
        canvas.addEventListener("mousemove", this.onMouseMoveDisplayCoords);
        canvas.addEventListener("mouseup", this.onMouseUp);
        canvas.addEventListener("mouseleave", this.clearDisplayCoords);
        canvas.addEventListener("click", this.onClick);

        // 定义默认画笔样式
        this.lineColor = "black";
        this.lineWidth = 5;
        this.context.lineCap = "round";
        this.context.globalCompositeOperation = "source-over";

        // 初始化变量
        this.isDrawing = false;
        this.lastX = 0;
        this.lastY = 0;
        this.imgData = null;

        this.undoStack = [];
        this.redoStack = [];

        this.currentTool = "pen";
        this.shapeStartX = 0;
        this.shapeStartY = 0;
    }

    onMouseDown = (event) => {
        if (this.currentTool !== "picker") {
            this.isDrawing = true;
        }
        this.context.strokeStyle = this.lineColor;
        this.context.lineWidth = this.lineWidth;
        this.lastX = event.offsetX;
        this.lastY = event.offsetY;
        const imageData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
        this.undoStack.push(imageData);
        this.redoStack = [];

        if (["rect", "circle"].includes(this.currentTool)) {
            this.shapeStartX = event.offsetX;
            this.shapeStartY = event.offsetY;
            this.imgData = imageData;
        }
    };

    onMouseMove = (event) => {
        if (!this.isDrawing) return;

        if (["rect", "circle"].includes(this.currentTool)) {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.context.putImageData(this.imgData, 0, 0);
            const deltaX = event.offsetX - this.shapeStartX;
            const deltaY = event.offsetY - this.shapeStartY;
            this.drawShape(this.shapeStartX, this.shapeStartY, deltaX, deltaY);
        } else {
            this.context.beginPath();
            this.context.moveTo(this.lastX, this.lastY);
            this.context.lineTo(event.offsetX, event.offsetY);
            this.context.stroke();

            this.lastX = event.offsetX;
            this.lastY = event.offsetY;
        }
    };

    onMouseMoveDisplayCoords = (event) => {
        const x = event.clientX - this.canvas.offsetLeft;
        const y = event.clientY - this.canvas.offsetTop;
        this.mouseCoord.innerHTML = `x: ${x}, y: ${y}`;
    };

    clearDisplayCoords = (event) => {
        this.mouseCoord.innerHTML = "";
    };

    onMouseUp = (event) => {
        this.isDrawing = false;
        if (["rect", "circle"].includes(this.currentTool)) {
            const deltaX = event.offsetX - this.shapeStartX;
            const deltaY = event.offsetY - this.shapeStartY;

            this.drawShape(this.shapeStartX, this.shapeStartY, deltaX, deltaY);
        }
    };

    onClick = (event) => {
        const x = event.offsetX;
        const y = event.offsetY;
        if (this.currentTool === "picker") {
            const pixel = this.context.getImageData(x, y, 1, 1).data;
            const color = rgbToHex(pixel[0], pixel[1], pixel[2]);
            this.setLineColor(color);
        }
    };

    drawShape(startX, startY, deltaX, deltaY) {
        switch (this.currentTool) {
            case "circle":
                const radius = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
                this.drawCircle(startX, startY, radius);
                break;
            case "rect":
                this.drawRect(startX, startY, deltaX, deltaY);
                break;
            default:
                break;
        }
    }

    drawCircle(x, y, radius) {
        this.context.beginPath();
        this.context.arc(x, y, radius, 0, 2 * Math.PI);
        this.context.stroke();
    }

    drawRect(x, y, width, height) {
        this.context.strokeRect(x, y, width, height);
    }

    setTool(shape) {
        this.currentTool = shape;
        if (this.currentTool === "eraser") {
            this.context.globalCompositeOperation = "destination-out";
        } else {
            this.context.globalCompositeOperation = "source-over";
        }
    }

    setLineColor(color) {
        this.lineColor = color;
        const currentColorBlock = this.currentColorEl.querySelector(".color-block");
        const currentColorCode = this.currentColorEl.querySelector(".color-code");
        // 更新当前颜色块和颜色代码显示
        currentColorBlock.style.backgroundColor = color;
        currentColorCode.textContent = color;
    }

    setLineWidth(width) {
        this.lineWidth = width;
    }

    setLineCap(style) {
        this.context.lineCap = style;
    }

    undo() {
        if (this.undoStack.length === 0) return;
        this.redoStack.push(this.context.getImageData(0, 0, this.canvas.width, this.canvas.height));
        this.context.putImageData(this.undoStack.pop(), 0, 0);
    }

    redo() {
        if (this.redoStack.length === 0) return;
        this.undoStack.push(this.context.getImageData(0, 0, this.canvas.width, this.canvas.height));
        this.context.putImageData(this.redoStack.pop(), 0, 0);
    }

    saveAsImage() {
        const link = document.createElement("a");
        link.download = "paint.png";
        link.href = this.canvas.toDataURL();
        link.click();
    }

    clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.undoStack = [];
        this.redoStack = [];
    }
}
