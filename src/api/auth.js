import apiUrl from '../apiConfig'
import axios from 'axios'

export const signUp = credentials => {
  return axios({
    method: 'POST',
    url: apiUrl + '/auth/sign-up/',
    data: {
      credentials: {
        email: credentials.email,
        password: credentials.password,
        password_confirmation: credentials.passwordConfirmation
      }
    }
  })
}

export const signIn = credentials => {
  return axios({
    url: apiUrl + '/auth/sign-in/',
    method: 'POST',
    data: {
      credentials: {
        email: credentials.email,
        password: credentials.password
      }
    }
  })
}

export const signOut = user => {
  return axios({
    url: apiUrl + '/auth/sign-out/',
    method: 'DELETE',
    headers: {
      'Authorization': `Token ${user.token}`
    }
  })
}

export const changePassword = (passwords, user) => {
  return axios({
    url: apiUrl + '/auth/change-pw/',
    method: 'PATCH',
    headers: {
      'Authorization': `Token ${user.token}`
    },
    data: {
      passwords: {
        old: passwords.oldPassword,
        new: passwords.newPassword
      }
    }
  })
}
