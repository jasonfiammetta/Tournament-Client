import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { getTournament, deleteTournament } from '../../api/tournaments'
class ViewTournament extends Component {
  constructor (props) {
    super(props)
    this.state = {
      tournament: null
    }
  }

  componentDidMount () {
    getTournament(this.props.match.params.id)
      .then(res => {
        this.setState({ tournament: res.data })
      })
      .catch(console.error)
  }

  delete = () => {
    deleteTournament(this.props.match.params.id, this.props.user)
      .then(res => console.log('deleted', res))
      .catch(console.error)
  }

  render () {
    const { tournament } = this.state
    if (!tournament) {
      return (
        <div className="loading">
          Loading...
        </div>
      ) // bootstrap spinner?
    }

    let tdControls = ''
    console.log('tournament', tournament)
    console.log('user', this.props.user)
    if (tournament && this.props.user && tournament.owner === this.props.user.id) {
      tdControls = (
        <div>
          <Link to={`/tournaments/${tournament.id}/edit/`} >
            <Button variant="primary">Edit Tournament</Button>
          </Link>
          <Button variant="danger" onClick={this.delete} >Delete Tournament</Button>
        </div>
      )
    }

    console.log('tournament', tournament)

    return (
      <div className="tournament">
        <p>{tournament.name}</p>
        <p>{tournament.description}</p>
        <p>Run by {tournament.owner_email}</p>
        {tdControls}
      </div>
    )
  }
}

export default ViewTournament
