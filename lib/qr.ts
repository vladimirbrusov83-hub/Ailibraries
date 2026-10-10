import QRCode from "qrcode";

// Builds a QR code as one SVG path at build time, so pages ship a static image and no QR script.
export function qrSvgPath(text: string, margin = 4) {
  const { modules } = QRCode.create(text, { errorCorrectionLevel: "M" });
  const size = modules.size;
  let d = "";
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      if (modules.get(y, x)) d += `M${x + margin} ${y + margin}h1v1h-1z`;
    }
  }
  return { d, viewBox: size + margin * 2 };
}
