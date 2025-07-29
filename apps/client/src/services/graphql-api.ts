import { createApi } from '@reduxjs/toolkit/query/react'
import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:3000'

export const api = createApi({
  baseQuery: graphqlRequestBaseQuery({
    url: `${API_BASE}/graphql`,
  }),
  endpoints: () => ({}),
})