import config from './config'

export const groups = Array.from(
  new Set(config.elements.reduce((p, i) => [...p, ...i.groups], []))
).reduce((p, i) => {
  const item = { name: i, items: config.elements.filter(j => j.groups.includes(i)) }
  p.push(item)
  return p
}, [])

export const elementsMap = config.elements.reduce((p, i) => {
  p[i.id] = i
  return p
}, {})
