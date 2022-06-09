import '@testing-library/jest-dom/extend-expect'

import 'isomorphic-fetch'
import fetch from 'isomorphic-fetch'

const host = process.env.HOST || ''
const customFetch = (path) => fetch(`${host}${path}`)

global.window.fetch = customFetch
