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
        description: details.description,
        players: cleanup(details.players)
      }
    }
  })
}

/* eslint-disable camelcase */
export const addPlayers = (t_id, user, playerList) => {
  return axios({
    url: apiUrl + `/tournaments/${t_id}/players/`,
    method: 'POST',
    headers: {
      'Authorization': `Token ${user.token}`
    },
    data: { player_list: cleanup(playerList) }
  })
}
// Take a comma separated string and turn into array of player names
const cleanup = players => {
  const playerList = players === '' ? []
    : players.split(',')
      .map(p => p && p[0] === ' ' ? p.slice(1) : p)
      .filter(p => p.length > 0)
  // console.log('player list', playerList)
  return playerList
}

export const getTournaments = () => {
  return axios({
    url: apiUrl + '/tournaments/',
    method: 'GET'
  })
}

export const getTournament = id => {
  return axios({
    url: apiUrl + `/tournaments/${id}/`,
    method: 'GET'
  })
}

// export const getAuthTournament = (id, user) => {
//   return axios({
//     url: apiUrl + `/tournaments/${id}/`,
//     method: 'GET',
//     headers: {
//       'Authorization': `Token ${user.token}`
//     }
//   })
// }

export const editTournament = (id, user, data) => {
  console.log('edit', id, user, data)
  return axios({
    url: apiUrl + `/tournaments/${id}/`,
    method: 'PATCH',
    headers: {
      'Authorization': `Token ${user.token}`
    },
    data: data
  })
}

export const deleteTournament = (id, user) => {
  console.log('delete', id, user)
  return axios({
    url: apiUrl + `/tournaments/${id}/`,
    method: 'DELETE',
    headers: {
      'Authorization': `Token ${user.token}`
    }
  })
}

export const getMatch = (t_id, m_id) => {
  return axios({
    url: apiUrl + `/tournaments/${t_id}/matches/${m_id}/`,
    method: 'GET'
  })
}
