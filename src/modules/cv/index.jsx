import {connect} from '../connect'
import {commands} from './commands'
import {CvTemplate} from './template'
import {CvStatechart} from './statechart'
import {Model} from './model'
import {ControlFlow} from '../control-flow'

const CvControlFlow = ControlFlow(
  CvStatechart,
  commands,
)

const eventHandlers = {
  onClickContactMe: () => CvControlFlow.transit({
    event: 'toggleContacts',
  }),
}

if (Model.data.iddle) {
  CvControlFlow.transit({
    event: 'getData',
  })
}

export const Cv = connect(Model, eventHandlers)(CvTemplate)
