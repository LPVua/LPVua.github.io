import model from './model'

const actions = {
  setIsLoading: model.createAction(
    (isLoading) => () => ({isLoading})
  ),
  setCareerHistory: model.createAction(
    (careerHistory) => () => ({
      careerHistory,
    })
  ),
  setSkills: model.createAction(
    (skills) => () => ({skills})
  ),
  setContacts: model.createAction(
    (contacts) => () => ({contacts})
  ),
  setLanguages: model.createAction(
    (languages) => () => ({languages})
  ),
}

export default actions
