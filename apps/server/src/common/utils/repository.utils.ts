export function generateId() {
  return crypto.randomUUID()
}

export function dateNow() {
  return new Date().toISOString()
}