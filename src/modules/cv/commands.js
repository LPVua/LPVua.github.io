import {Api} from '../api'

import {Model} from './model'

export const commands = {
  hideLoaders: () => () => {
    Model.updateData({
      isLoading: false,
    })
  },
  showContacts: () => () => {
    Model.updateData({
      showContacts: true,
      showContactMe: false,
    })
  },
  hideContacts: () => () => {
    Model.updateData({
      showContacts: false,
      showContactMe: true,
    })
  },
  fetchData: (transit) => () => {
    Model.updateData({
      isLoading: true,
    })

    Api(
      (api) => api.query('', {
        pageSize: 100,
      }),
    ).then(
      (response) => {
        transit({
          event: 'fetchSuccess',
          payload: response,
        })
      })
  },
  updateData: () => (payload) => {
    const careerHistory = []
    const skills = []
    const contacts = []
    const languages = []

    payload.results.forEach(
      (result) => {
        switch (result.type) {
          case 'career':
            careerHistory.push(result)
            break
          case 'skill':
            skills.push(result)
            break
          case 'contact':
            contacts.push(result)
            break
          case 'language':
            languages.push(result)
            break
        }
      }
    )

    careerHistory.reverse()
    languages.reverse()
    skills.reverse()

    const data = {
      skills,
      languages,
      careerHistory,
      contacts,
    }

    Model.updateData(data)
  },
  stats: () => () => {
    window.gtag('event', 'revealContacts')
  },
}
