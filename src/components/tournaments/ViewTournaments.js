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

  jsx = ''

  componentDidMount () {
    getTournaments()
      .then(res => {
        console.log('res data', res.data)
        this.jsx = JSON.stringify(res.data, null, 2)
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
        <p>Here is where the tournaments go</p>
        {this.jsx}
        <ListGroup>
          {this.getTournamentList(this.state.tournaments)}
        </ListGroup>
      </div>
    )
  }
}

export default ViewTournaments
