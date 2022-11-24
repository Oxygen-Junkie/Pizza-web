import http from './http-common'

const LOG_URL = import.meta.env.VITE_url_signin
const REG_URL = import.meta.env.VITE_url_signup
const Phones_URL = import.meta.env.VITE_url_phones
const Roles_URL = import.meta.env.VITE_url_setRole
const Bans_URL = import.meta.env.VITE_url_ban

class AuthService {
  login(phone: string, password: string) {
    return http
      .post(`${LOG_URL}`, {
        phone,
        password,
      })
      .then((response) => {
        if (response.data.accessToken)
          localStorage.setItem('user', JSON.stringify(response.data))

        return response.data
      })
  }

  logout() {
    localStorage.removeItem('user')
  }

  register(phone: string, password: string) {
    return http.post(`${REG_URL}`, {
      location,
      phone,
      password,
    }).then((response) => {
      if (response.data.accessToken)
        localStorage.setItem('user', JSON.stringify(response.data))

      return response.data
    })
  }

  getPhones() {
    return http.get(`${Phones_URL}`)
  }

  setRoles(phone: string, role: number) {
    return http.post(`${Roles_URL}`, {
      phone,
      role,
    })
  }

  ban(phone: string) {
    return http.post(`${Bans_URL}`, {
      phone,
    })
  }
}

export default new AuthService()

