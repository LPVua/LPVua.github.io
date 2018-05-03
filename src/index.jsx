import {h, render} from 'preact'
import {Machine} from 'xstate'

import './scss/index.scss'

import Main from './main'

const machine = Machine({
  initial: 'START',
  states: {
    START: {
      on: {
        getData: 'LOADING',
      },
    },
    LOADING: {
      onEntry: ['fetchData'],
      on: {
        searchSuccess: {
          CV: {
            actions: [
              'updateData',
            ],
          },
        },
      },
    },
    CV: {

    },
  },
})

const main = document.getElementById('app')

render(<Main machine={machine} />, main, main.lastElementChild)
