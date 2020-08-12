import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, ListGroup } from 'react-bootstrap'
import { getTournament, deleteTournament, addPlayers } from '../../api/tournaments'
class ViewTournament extends Component {
  constructor (props) {
    super(props)
    this.state = {
      tournament: null,
      players: ''
    }
  }

  componentDidMount () {
    getTournament(this.props.match.params.id)
      .then(res => {
        this.setState({ tournament: res.data })
      })
      .catch(console.error)
  }

  addPlayerList = event => {
    event.preventDefault()

    addPlayers(this.props.match.params.id, this.props.user, this.state.players)
      .then(res => {
        console.log('response from adding players', res.data)
        this.setState({ tournament: res.data })
      })
      .catch(console.error)
  }

  delete = () => {
    deleteTournament(this.props.match.params.id, this.props.user)
      .then(res => console.log('deleted', res))
      .catch(console.error)
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  render () {
    const { tournament, players } = this.state
    if (!tournament) {
      return (
        <div className="loading">
          Loading...
        </div>
      ) // bootstrap spinner?
    }

    let tdControls = ''
    if (tournament && this.props.user && tournament.owner === this.props.user.id) {
      tdControls = (
        <div>
          <Form onSubmit={this.addPlayerList}>
            <Form.Group>
              <Form.Label>Players (You can add more later)</Form.Label>
              <Form.Control
                type="text"
                name="players"
                value={players}
                placeholder="Separate names with commas, i.e. Alice, Bob, Charlie"
                onChange={this.handleChange} />
            </Form.Group>
            <Button variant="primary" type="submit" >Add Players</Button>
          </Form>
          <Link to={`/tournaments/${tournament.id}/edit/`} >
            <Button variant="primary">Edit Tournament</Button>
          </Link>
          <Button variant="danger" onClick={this.delete} >Delete Tournament</Button>
        </div>
      )
    }

    return (
      <div className="tournament">
        <p>{tournament.name}</p>
        <p>{tournament.description}</p>
        <p>Contact the Tournament Director at {tournament.owner_email}</p>
        {tdControls}
        <ListGroup>
          {tournament.player_names.map(p => (
            <ListGroup.Item key={tournament.player_names.indexOf(p)}>
              {p}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    )
  }
}

export default ViewTournament
