import {connect} from '../connect'
import {machine} from './machine'
import {commands} from './commands'
import {CvContainer} from './container'

export const Cv = connect(machine, commands)(CvContainer)
