import { cloneElement, forwardRef, useEffect, useRef, useState } from 'react'

// 缓存数据
const FetchWrapperCache: Record<string, any> = {}

interface FetchWrapperProps<T> {
  fetch?: (params?: any) => Promise<T>
  /** 缓存Key 注意项目唯一 */
  cacheKey?: string
  render: (
    data: any,
    loading: boolean,
    other: {
      params: any
      setParams: any
    }
  ) => React.ReactElement
  /** 请求参数 */
  params?: any
  [key: string]: any
}

function FetchWrapper<T extends any>(props: FetchWrapperProps<T>, ref: any) {
  const { fetch, cacheKey, render, params: originParams, ...restProps } = props
  const [data, setData] = useState<T>()
  const [params, setParams] = useState<any>(originParams)
  const [loading, setLoading] = useState(false as any)
  const mounted = useRef(true)

  useEffect(() => {
    setParams(originParams)
  }, [originParams])

  useEffect(() => {
    return () => {
      mounted.current = false
    }
  }, [])

  useEffect(() => {
    if (cacheKey && FetchWrapperCache[cacheKey]) {
      setData(FetchWrapperCache[cacheKey])
      return
    }
    if (!fetch) return
    setLoading({ delay: 200 })
    fetch(params)
      .then(res => {
        mounted.current && setData(res)
        cacheKey && res && (FetchWrapperCache[cacheKey] = res)
      })
      .finally(() => {
        mounted.current && setLoading(false)
      })
  }, [params])

  return cloneElement(render(data, loading, { params, setParams }), {
    ref,
    ...restProps
  })
}

export default forwardRef(FetchWrapper)
