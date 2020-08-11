import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { getTournament, editTournament } from '../../api/tournaments'

class EditTournament extends Component {
  constructor (props) {
    super(props)

    this.state = {
      tournament: null
      // name: '',
      // game: '',
      // description: ''
    }
  }

  componentDidMount () {
    getTournament(this.props.match.params.id)
      .then(res => {
        console.log('res data', res.data)
        this.setState({ tournament: res.data })
      })
      .catch(console.error)
  }

  handleChange = event => {
    event.persist()
    this.setState(prevState => ({
      tournament: {
        ...prevState.tournament,
        [event.target.name]: event.target.value
      }
    }))
  }

  edit = event => {
    event.preventDefault()
    const { match, user } = this.props

    editTournament(match.params.id, user, this.state)
      .then(res => {
        console.log(res.data)
      })
      .catch(console.error)
  }

  render () {
    if (!this.props.user) {
      return (
        <div>
          <p>Unauthorized.</p>
        </div>
      )
    }

    if (!this.state.tournament) {
      console.log('tournament state', this.state.tournament)
      return (
        <div className="loading">
          Loading...
        </div>
      ) // bootstrap spinner?
    }

    const { name, game, description } = this.state.tournament

    return (
      <div className="edit-form">
        <Form onSubmit={this.edit}>
          <Form.Group controlId="name">
            <Form.Label>Tournament Name</Form.Label>
            <Form.Control
              required
              type="text"
              name="name"
              value={name}
              placeholder="Enter tournament name"
              onChange={this.handleChange} />
          </Form.Group>
          <Form.Group controlId="game">
            <Form.Label>Tournament Game</Form.Label>
            <Form.Control
              required
              type="text"
              name="game"
              value={game}
              placeholder="Enter tournament game"
              onChange={this.handleChange} />
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label>Tournament Description</Form.Label>
            <Form.Control
              required
              type="textarea"
              name="description"
              value={description}
              placeholder="Enter tournament description"
              onChange={this.handleChange} />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    )
  }
}

export default EditTournament
