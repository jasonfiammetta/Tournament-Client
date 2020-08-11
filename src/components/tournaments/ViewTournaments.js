import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { ListGroup } from 'react-bootstrap'
import { getTournaments } from '../../api/tournaments'

class ViewTournaments extends Component {
  constructor () {
    super()

    this.state = {
      tournaments: []
    }
  }

  componentDidMount () {
    getTournaments()
      .then(res => {
        console.log('res data', res.data)
        this.setState({ tournaments: res.data })
      })
      .catch(console.error)
  }

  getTournamentList (tournamentList) {
    return tournamentList.map(tournament => (
      <ListGroup.Item key={tournament.id}>
        <Link to={`/tournaments/${tournament.id}`}>{tournament.name}</Link>
      </ListGroup.Item>
    ))
  }

  render () {
    return (
      <div className="view">
        <ListGroup>
          {this.getTournamentList(this.state.tournaments)}
        </ListGroup>
      </div>
    )
  }
}

export default ViewTournaments
