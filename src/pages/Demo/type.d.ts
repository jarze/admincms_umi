// property

interface StyleSize {
  value: number
  unit: 'px' | '%' | 'auto'
}

interface Style {
  width: StyleSize
  height: StyleSize
}
