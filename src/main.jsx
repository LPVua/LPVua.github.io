import {h, Component} from 'preact'
import Prismic from 'prismic-javascript'

const apiEndpoint = 'https://pavlo.cdn.prismic.io/api/v2'
// eslint-disable-next-line
const apiToken = 'MC5Xcy1kNUNnQUFDY0FRcWM5.77-9Xe-_vXrvv70rb--_ve-_vQo177-9FQHvv73vv71JX--_ve-_vUHvv70W77-977-977-9LnTvv73vv71B77-9'

const Api = (callback) => Prismic.getApi(
  apiEndpoint, {
    accessToken: apiToken,
  }
).then(
  (api) => callback(api)
).catch(
  (reason) => console.log(reason)
)

Api.Predicates = Prismic.Predicates

const GroupTitle = ({children, isLoading}) => (
  <div class={
    `group_title ${isLoading ? 'group_title-loading' : ''}`
  }>
    {children}
  </div>
)

/**
 * Main component
 */
class Main extends Component {
  /**
   * @inheritDoc
   */
  constructor(props) {
    super(props)

    this.state = {
      current: this.props.machine.initialState.value,
      skills: [],
      contacts: [],
      careerHistory: [],
      languages: [],
    }
  }

  /**
   * Make transition from one state to another
   *
   * @param {object} event
   */
  transition(event) {
    const currentState = this.state.current
    const nextState = this.props
      .machine.transition(currentState, event.type)

    const componentState = nextState.actions
      .reduce(
        (state, action) => this.command(action, event) || state,
        undefined
      )

    this.setState({
      current: nextState.value,
      ...componentState,
    })
  }

  /**
   * Command
   *
   * @param {string} action
   * @param {object} event
   *
   * @return {null}
   */
  command(action, event) {
    switch (action) {
      case 'fetchData':
        Api(
          (api) => api.query('', {
            pageSize: 100,
          }),
        ).then(
          (response) => {
            const careerHistory = []
            const skills = []
            const contacts = []
            const languages = []

            response.results.forEach(
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

            const payload = {
              skills,
              languages,
              careerHistory,
              contacts,
            }

            this.transition({
              type: 'searchSuccess',
              payload: payload,
            })
          })

        break
      case 'updateData':
        return event.payload
    }
  }


  /**
   * @inheritDoc
   */
  render() {
    const {skills, contacts, careerHistory, languages} = this.state

    if (this.state.current === 'START') {
      this.transition({type: 'getData'})
      return null
    }

    const isLoading = this.state.current === 'LOADING'

    return (
      <div>
        <div class='header'>
          <div class='header_left'>
            <div class={
              `header_name ${isLoading ? 'header_name-loading' : ''}`
            }>
              Pavlo Lompas
            </div>
            <div class={
              `header_description 
                ${isLoading ? 'header_description-loading' : ''}`
            }>Frontend developer</div>
          </div>
          <div class='header_right'>
            {
              isLoading && [
                <div class='header_contact header_contact-loading' />,
                <div class='header_contact header_contact-loading' />,
                <div class='header_contact header_contact-loading' />,
              ]
            }
            {
              !isLoading && contacts.map(
                (contact) => (
                  <div class='header_contact'>
                    <div class='header_contactname'>
                      {contact.data.contact_name}:
                    </div>
                    <div class='header_contactvalue'>
                      {contact.data.contact_value}
                    </div>
                  </div>
                )
              )
            }
          </div>
        </div>
        <div class='group group-darkgrey'>
          <GroupTitle isLoading={isLoading}>Technical skills</GroupTitle>
          <div class='group_content'>
            <div class='group_tags'>
              {skills.map(
                (skill) => (
                  <div class='tag group_tag'>
                    {skill.data.skill[0].text}
                  </div>
                )
              )}
            </div>
          </div>
        </div>
        <div class='group group-grey'>
          <GroupTitle isLoading={isLoading}>Career history</GroupTitle>
          <div class='group_content'>
            {
              careerHistory.map(
                (career) => {
                  // eslint-disable-next-line
                  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

                  const startedAt = new Date(career.data.started_at)
                  const finishedAt = career.data.finished_at
                    ? new Date(career.data.finished_at) : null

                  return (
                    <div class='career'>
                      <div class='career_title'>
                        {
                          career
                            .data
                            .career[0]
                            .text
                        } at {career.data.company_name}
                      </div>
                      <div class='career_date'>
                        {`${
                          months[startedAt.getMonth()]
                        } ${
                          startedAt.getFullYear()
                        }`}
                        {
                          finishedAt &&
                              // eslint-disable-next-line
                              ` - ${months[finishedAt.getMonth()]} ${finishedAt.getFullYear()}`
                        }
                      </div>
                      <div class='career_duties'>
                            Duties:
                      </div>
                      <div class='career_description'>
                        {
                          career
                            .data
                            .responsibilities[0]
                            .text
                        }
                      </div>
                    </div>
                  )
                }
              )
            }

          </div>
        </div>
        <div class='group'>
          <GroupTitle isLoading={isLoading}>Languages</GroupTitle>
          <div class='group_content'>
            <div class='languages'>
              {
                languages.map(
                  (language) => (
                    <div class='language'>
                      <div class='language_name'>
                        {language.data.lanugage[0].text}
                      </div>
                      <div class='language_level'>
                        {language.data.level}
                      </div>
                    </div>
                  )
                )
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Main
