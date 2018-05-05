import {Machine} from 'xstate'

export const ControlFlow = (
  statechart,
  commands,
) => {
  const machine = Machine(statechart)

  let currentState = machine.initialState.value

  const command = (action, event) => {
    return commands[action] &&
      commands[action](transit)(event.payload)
  }

  const transit = (transitObj) => {
    const nextState = machine.transition(
      transitObj.to ? transitObj.to : currentState,
      transitObj.event,
    )

    nextState.actions.forEach(
      (action) => command(action, transitObj)
    )

    currentState = nextState.value
  }

  const getCurrentState = () => currentState

  return {
    transit,
    getCurrentState,
  }
}
