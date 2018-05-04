import {h} from 'preact'
import {CvTemplate} from './template'

export const CvContainer = ({machineState, transit, ...props}) => {
  if (machineState.value === 'START') {
    transit({type: 'getData'})
    return null
  }

  const isLoading = machineState.value === 'LOADING'
  const showContactMe = machineState.value === 'CV'
  const showContacts = machineState.value === 'CONTACTS_SHOWN'

  return <CvTemplate
    {...props}
    isLoading={isLoading}
    showContactMe={showContactMe}
    showContacts={showContacts}
    onClickContactMe={() => transit({type: 'toggleContacts'})}
  />
}
