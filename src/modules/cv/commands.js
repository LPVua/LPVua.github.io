import {Api} from '../api'

export const commands = {
  fetchData: (state, transit) => () => {
    Api(
      (api) => api.query('', {
        pageSize: 100,
      }),
    ).then(
      (response) => {
        transit({
          type: 'searchSuccess',
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

    return data
  },
  stats: () => () => {
    window.gtag('event', 'revealContacts')
  },
}
