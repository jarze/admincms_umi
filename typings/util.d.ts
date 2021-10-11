type ReplaceKeys<T, P> = {
  [key in keyof T]: key extends keyof P ? P[key] : T[key]
}
