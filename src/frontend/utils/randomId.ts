export default function () {
  return Buffer.from(Math.random().toString(), "base64").toString();
}
