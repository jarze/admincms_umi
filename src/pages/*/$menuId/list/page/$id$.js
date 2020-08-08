/**
 * Routes:
 *   - ./src/routes/list.js
 */

import React, { useEffect } from 'react'
import { SinglePage } from '@/components/comm'
import { connectList } from '../_logic'

export default connectList(({ dispatch, computedMatch: { params: matchParams }, pageConfig, NS, ...props }) => {
  useEffect(() => {
    dispatch({
      type: `${NS}/fetchItemInfo`,
      payload: {
        matchParams,
      },
    })
  }, [])

  if (pageConfig && typeof pageConfig.items === 'function') {
    pageConfig.items = pageConfig.items(props)
  }
  return <SinglePage {...props} {...pageConfig} />
})
