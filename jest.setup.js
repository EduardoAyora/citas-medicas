import '@testing-library/jest-dom/extend-expect'

import 'isomorphic-fetch'
import fetch from 'isomorphic-fetch'

const host = process.env.HOST || ''
const customFetch = (path, conf) => fetch(`${host}${path}`, conf)

global.window.fetch = customFetch
