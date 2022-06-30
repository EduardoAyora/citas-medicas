import '@testing-library/jest-dom/extend-expect'

import 'isomorphic-fetch'
import fetch from 'isomorphic-fetch'

// configurar fetch para que funcione
const host = process.env.HOST || ''
const customFetch = (path, conf) => fetch(`${host}${path}`, conf)

global.window.fetch = customFetch

// Evitar errores por el modal
const intersectionObserverMock = () => ({
  observe: () => null,
  disconnect: () => null,
  unobserve: () => null,
})
window.IntersectionObserver = jest
  .fn()
  .mockImplementation(intersectionObserverMock)
