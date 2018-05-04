import './scss/index.scss'

import {render, h} from 'preact'
import {Cv} from './modules/cv'

const main = document.getElementById('app')

render(
  <Cv />,
  main,
  main.lastElementChild
)
