import apiUrl from '../apiConfig'
import axios from 'axios'

export const createTournament = (user, details) => {
  return axios({
    url: apiUrl + '/tournaments/',
    method: 'POST',
    headers: {
      'Authorization': `Token ${user.token}`
    },
    data: {
      tournament: {
        name: details.name,
        game: details.game,
        description: details.description
      }
    }
  })
}

export const getTournaments = () => {
  return axios({
    url: apiUrl + '/get-tournaments/',
    method: 'GET'
  })
}

export const getTournament = id => {
  return axios({
    url: apiUrl + '/get-tournaments/' + id,
    method: 'GET'
  })
}
