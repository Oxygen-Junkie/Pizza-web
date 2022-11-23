import http from './http-common'
const LOG_URL = import.meta.env.VITE_url_signin
const REG_URL = import.meta.env.VITE_url_signup

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
}

export default new AuthService()
