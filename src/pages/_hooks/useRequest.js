import { useEffect, useState, useRef } from 'react'
export default ({ fetchData, params, handlerData }) => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState()
  const mounted = useRef(true)

  useEffect(() => () => (mounted.current = false), [])

  useEffect(() => {
    if (!fetchData) return
    setLoading(true)
    fetchData(params)
      .then(res => {
        mounted.current && setData(handlerData ? handlerData(res) : res)
      })
      .finally(() => {
        mounted.current && setLoading(false)
      })
  }, [fetchData, params])
  return { data, loading }
}
