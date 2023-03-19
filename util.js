// RGB数值转换为16进制颜色
const rgbToHex = (r, g, b) => {
    r = Math.round(r);
    g = Math.round(g);
    b = Math.round(b);

    const hex = "#" + toHex(r) + toHex(g) + toHex(b);
    return hex;
};

const toHex = (value) => value.toString(16).padStart(2, "0");
