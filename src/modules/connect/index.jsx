import {h, Component} from 'preact'

export const connect = (model, eventHandlers) => (ConnectedComponent) =>
  class ModelComponent extends Component {
    /**
     * Constructor
     */
    constructor() {
      super()
      this.state = {
        ...model.data,
        ...eventHandlers,
      }
    }

    /**
     * @inheritDoc
     */
    componentWillMount() {
      const updateData = (oldUpdater) => (data) => {
        oldUpdater(data)

        this.setState({
          ...this.state,
          ...model.data,
        })
      }

      // Set state on every model data update
      model.updateData = updateData(model.updateData)
    }

    /**
     * @inheritDoc
     */
    componentWillUnmount() {
      // Reset model's update data to previous state
      model.updateData = this.oldUpdater
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
