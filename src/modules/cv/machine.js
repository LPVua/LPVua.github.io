import {Machine} from 'xstate'

export const machine = Machine({
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
      on: {
        toggleContacts: 'CONTACTS_SHOWN',
      },
    },
    CONTACTS_SHOWN: {
      onEntry: ['stats'],
      on: {
        toggleContacts: 'CV',
      },
    },
  },
})
