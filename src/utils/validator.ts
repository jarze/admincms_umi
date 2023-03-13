export const isNum = t => !Number.isNaN(Number(t))

export const validNumber = (
  integer: number = 1,
  decimal: number = 1,
  positive: boolean = false,
  messagePrefix: string = ''
) => (rule, value, callback?): void | string => {
  if (!String(value ?? '').length) {
    callback && callback()
    return
  }
  const message = `${messagePrefix}最多${integer}位整数及${decimal}位小数${
    positive ? '的正数' : ''
  }`
  const pattern = eval(
    `/^${positive ? '' : '-?'}(?:[1-9]\\d{0,${integer - 1}}|0)(?:\\.\\d{0,${decimal}})?$/`
  )
  if (!pattern.test(value)) {
    callback && callback(message)
    return message
  } else {
    callback && callback()
    return
  }
}
