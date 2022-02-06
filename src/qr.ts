import QRCode from "qrcode";

// With async/await
export async function generateQR(uri: string) {
  const buffer = await QRCode.toBuffer(uri);
  return buffer;
}
