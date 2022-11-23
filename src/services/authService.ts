import authHeader from './auth-header'
import http from './http-common'
const LOG_URL = import.meta.env.VITE_url_signin
const REG_URL = import.meta.env.VITE_url_signup
const Phones_URL = import.meta.env.VITE_url_ban
const Roles_URL = import.meta.env.VITE_url_phones
const Bans_URL = import.meta.env.VITE_url_setRole

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
    return http.get(`${Phones_URL}`, { headers: authHeader() })
  }

  setRoles(phone: string, role: number) {
    return http.post(`${Roles_URL}`, {
      phone,
      role,
    }, { headers: authHeader() })
  }

  ban(phone: string) {
    return http.post(`${Bans_URL}`, {
      phone,
    }, { headers: authHeader() })
  }
}

export default new AuthService()

