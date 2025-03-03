function generateQR() {
    const text = document.getElementById("text").value;
    const color = document.getElementById("color").value;
    const logoFile = document.getElementById("logo").files[0];

    if (!text) {
        alert("Enter text or a URL to generate a QR code!");
        return;
    }

    const canvas = document.getElementById("qr-canvas");
    const qr = new QRCode(canvas, {
        text: text,
        width: 256,
        height: 256,
        colorDark: color,
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
    });

    // Add logo if uploaded
    if (logoFile) {
        const ctx = canvas.getContext("2d");
        const logo = new Image();
        logo.onload = function () {
            const size = 50;
            const x = (canvas.width - size) / 2;
            const y = (canvas.height - size) / 2;
            ctx.drawImage(logo, x, y, size, size);
        };
        logo.src = URL.createObjectURL(logoFile);
    }
}

function downloadQR() {
    const canvas = document.getElementById("qr-canvas");
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "qr-code.png";
    link.click();
}
