import { useEffect, useState } from 'react'
export default ({ fetchData, params, handlerData }) => {
  const [loading, setLoading] = useState(false)
  const [mounted, setMounted] = useState(true)
  const [data, setData] = useState()
  useEffect(() => () => setMounted(false), [])
  useEffect(() => {
    if (!fetchData) return
    setLoading(true)
    fetchData(params)
      .then(res => {
        mounted && setData(handlerData ? handlerData(res) : res)
      })
      .finally(() => {
        mounted && setLoading(false)
      })
  }, [fetchData, params])
  return { data, loading }
}
