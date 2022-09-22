import { useEffect, useState, useRef } from 'react'

interface UseRequestProps<T> {
  /* 发起请求 */
  fetchData?: (params?: any) => Promise<T | any>
  /* 请求参数， 改变会发起请求 */
  params?: any
  handlerData?: (/* 请求返回结果 */ res?: any) => T
}

export default function useRequest<T extends any>({
  fetchData,
  params = null,
  handlerData = null
}: UseRequestProps<T>) {
  const [loading, setLoading] = useState(false)
  const mounted = useRef<boolean>(true)
  const [data, setData] = useState<T>()

  useEffect(
    () => () => {
      mounted.current = false
    },
    []
  )

  useEffect(() => {
    if (!fetchData) return
    setLoading(true)
    fetchData(params)
      .then(res => {
        mounted.current && setData(handlerData ? handlerData(res) : res)
      })
      .catch(e => {
        console.error(e)
      })
      .finally(() => {
        mounted.current && setLoading(false)
      })
  }, [fetchData, params])

  return { data, loading, setData }
}
