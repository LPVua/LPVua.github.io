export const toggleContactsStatechart = {
  initial: 'CONTACTS_HIDDEN',
  states: {
    CONTACTS_SHOWN: {
      onEntry: ['stats', 'showContacts'],
      on: {
        toggleContacts: 'CONTACTS_HIDDEN',
      },
    },
    CONTACTS_HIDDEN: {
      onEntry: ['hideContacts'],
      on: {
        toggleContacts: 'CONTACTS_SHOWN',
      },
    },
  },
}
