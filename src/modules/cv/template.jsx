import {h} from 'preact'
import {Logo} from './logo'

const GroupTitle = ({children, isLoading}) => (
  <div class={
    `group_title ${isLoading ? 'group_title-loading' : ''}`
  }>
    {children}
  </div>
)

export const CvTemplate = ({
  isLoading = true,
  showContactMe = false,
  showContacts = false,
  contacts = [],
  skills = [],
  careerHistory = [],
  languages = [],
  onClickContactMe = () => null,
}) => {
  return (
    <div>
      <div class='header'>
        <div class='header_maininfo'>
          <div class='header_logo'>
            <Logo />
          </div>
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
        </div>
        <div class='header_right'>
          {
            isLoading && [
              <div class='header_contact header_contact-loading' />,
            ]
          }
          {
            showContactMe && (
              <div class='button button-contactme' onClick={onClickContactMe}>
                Contact me
              </div>
            )
          }
          {
            showContacts && contacts.map(
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
