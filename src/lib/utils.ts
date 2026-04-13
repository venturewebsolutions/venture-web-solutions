export function take(arr: any[], n: number) {
  if (arr.length === 0 || n <= 0) {
    return []
  }

  const result = []

  for (let i = 0; i < n; i++) {
    result.push(arr[i % arr.length])
  }

  return result
}
