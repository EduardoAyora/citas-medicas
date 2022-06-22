import { isAppPage, isAdminAppPage, isDoctorAppPage, isSecretarioAppPage, getPageLinks } from "../../pages/_app";

describe('isAppPage', () => {
  test('Devuelve valores verdaderos', () => {
    expect(isAppPage('/app')).toBe(true)
    expect(isAppPage('/app/rol')).toBe(true)
  })

  test('Devuelve valores falsos', () => {
    expect(isAppPage('/ap')).toBe(false)
    expect(isAppPage('/ap/rol')).toBe(false)
    expect(isAppPage('/otro/rol')).toBe(false)
  })
})

describe('isAdminAppPage', () => {
  test('Devuelve valores verdaderos', () => {
    expect(isAdminAppPage('/app/admin')).toBe(true)
  })

  test('Devuelve valores falsos', () => {
    expect(isAdminAppPage('/app/otro')).toBe(false)
  })
})

describe('isDoctorAppPage', () => {
  test('Devuelve valores verdaderos', () => {
    expect(isDoctorAppPage('/app/doctor')).toBe(true)
  })

  test('Devuelve valores falsos', () => {
    expect(isDoctorAppPage('/app/otro')).toBe(false)
  })
})

describe('isSecretarioAppPage', () => {
  test('Devuelve valores verdaderos', () => {
    expect(isSecretarioAppPage('/app/secretario')).toBe(true)
  })

  test('Devuelve valores falsos', () => {
    expect(isSecretarioAppPage('/app/otro')).toBe(false)
  })
})

describe('getPageLinks', () => {
  test('Devuelve links dependiendo del path', () => {
    const adminLinks: [] = []
    const secretarioLinks: Link[] = [{ name: 'Ver citas', href: '/citas' }]
    const doctorLinks: Link[] = [
      { name: 'Inicio', href: '/' },
      { name: 'Ver citas', href: '/citas' },
      { name: 'Agendar cita', href: '/agendar-cita' },
    ]
    expect(getPageLinks('/app/doctor', {doctorLinks, adminLinks, secretarioLinks}))
      .toEqual([
        {name: 'Inicio', href: '/app/doctor'},
        {name: 'Ver citas', href: '/app/doctor/citas'}, 
        {name: 'Agendar cita', href: '/app/doctor/agendar-cita'}
      ])
  })
})