export function HeatMap() {
  let start = 'linear-gradient(90deg'
  for (let i = 0; i < 10; i += 1) {
    start += `, hsl(${i * 20}, 100%, 50%)`
  }
  start += ')'
  return start
}

export function HeatMapBySegments(segments, values, duration) {
  let grad = 'linear-gradient(90deg'

  for (let i = 0; i < segments.length; i += 1) {
    grad += `, hsl(${values[i] * 100 * 1.8}, 100%, 50%) ${(
      (segments[i].timestamp[0] / duration) *
      100
    )
      .toString()
      .replace(',', '.')}%`
    grad += `, hsl(${values[i] * 100 * 1.8}, 100%, 50%) ${(
      (segments[i].timestamp[1] / duration) *
      100
    )
      .toString()
      .replace(',', '.')}%`
  }
  grad += ')'
  return grad
}
