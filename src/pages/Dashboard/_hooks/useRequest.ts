import { useEffect, useState, useRef } from 'react'

interface UseRequestProps<T> {
  /* 发起请求 */
  fetchData?: (params?: any) => Promise<T | any>
  /* 请求参数， 改变会发起请求 */
  params?: any
  handlerData?: (/* 请求返回结果 */ res?: any) => T
  /* 是否手动触发 */
  manual?: boolean
  /* 成功的回调 */
  successCb?: () => void
  /* 失败的回调 */
  failedCb?: () => void
}

export default function useRequest<T extends any>({
  fetchData,
  params = null,
  handlerData = null,
  manual,
  successCb,
  failedCb
}: UseRequestProps<T>) {
  const [loading, setLoading] = useState<boolean>()
  const mounted = useRef<boolean>(true)
  const [data, setData] = useState<T>()

  useEffect(
    () => () => {
      mounted.current = false
    },
    []
  )

  const run = (p?) => {
    setLoading(true)
    fetchData(p)
      .then(res => {
        mounted.current && setData(handlerData ? handlerData(res) : res)
        successCb?.()
      })
      .catch(e => {
        // console.error(e);
        failedCb?.()
      })
      .finally(() => {
        mounted.current && setLoading(false)
      })
  }

  useEffect(() => {
    if (!fetchData) return
    if (manual) return
    run(params)
  }, [fetchData, params, manual])

  return { data, loading, setData, run }
}
