import {h, Component} from 'preact'

export const connect = (machine, commands) => (ConnectedComponent) =>
  class ModelComponent extends Component {
    /**
     * Constructor
     */
    constructor() {
      super()
      this.transit = this.transit.bind(this)
      this.state = {
        machineState: machine.initialState,
        transit: this.transit,
      }
    }

    /**
     * Make transition from one state to another
     *
     * @param {object} event
     */
    transit(event) {
      const currentState = this.state.machineState.value
      const nextState = machine.transition(currentState, event.type)

      const componentState = nextState.actions
        .reduce(
          (state, action) => this.command(action, event) || state,
          undefined
        )

      this.setState({
        machineState: nextState,
        ...componentState,
      })
    }

    /**
     * Command
     *
     * @param {string} action
     * @param {object} event
     *
     * @return {null}
     */
    command(action, event) {
      return commands[action] &&
        commands[action](this.state, this.transit.bind(this))(event.payload)
    }

    /**
     * @inheritDoc
     */
    render() {
      return <ConnectedComponent
        {...this.state}
        {...this.props}
      />
    }
  }
