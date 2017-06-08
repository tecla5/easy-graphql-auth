export function isFun(fun) {
  return typeof fun === 'function'
}

export function isObject(obj) {
  return typeof obj === 'object'
}

export function isArray(obj) {
  return Array.isArray(obj)
}