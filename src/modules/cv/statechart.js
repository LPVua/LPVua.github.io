import {toggleContactsStatechart} from './toggle-contacts.statechart'

export const CvStatechart = {
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
        fetchSuccess: {
          CV: {
            actions: [
              'updateData',
            ],
          },
        },
      },
    },
    CV: {
      parallel: true,
      onEntry: ['hideLoaders'],
      states: {
        TOGGLE_CONTACTS: toggleContactsStatechart,
      },
    },
  },
}
