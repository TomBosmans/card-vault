export default function jsonify(obj: unknown) {
  return JSON.parse(JSON.stringify(obj))
}
