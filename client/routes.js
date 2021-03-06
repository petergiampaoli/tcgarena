import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Login, 
  Signup, 
  UserHome, 
  SetCockatriceName, 
  DecksMenu, 
  LobbyMenu
} from './components'
import {me, fetchDecks} from './store'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn, hasCockaName} = this.props
    console.log('hascockaname', hasCockaName)
    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route path="/cockaName" component={SetCockatriceName} />
            <Route path="/decks" component={DecksMenu} />
            <Route path="/home" component={UserHome} />
            {hasCockaName && (
              <Switch>
                {/* Routes placed here are only available after setting username */}
                <Route path="/lobby" component={LobbyMenu} />
              </Switch>
            )}
            {/* Displays set username component as a fallback */}
            <Route component={SetCockatriceName} />
          </Switch>
        )}
        {/* Displays our Login components as a fallback */}
        <Route component={Login} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    hasCockaName: !!state.user.cockatriceName
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
      dispatch(fetchDecks())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  hasCockaName: PropTypes.bool.isRequired
}
