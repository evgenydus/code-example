import { observer } from 'mobx-react'

import { SwitchBox } from '@frontend-kit/ui-components'

const ActiveSwitchBox = ({ status }) => (
  <SwitchBox
    checked={status.isActive}
    disabled={!status.ableToArchive}
    id={status.id}
    isPreventChangeState
    name="active"
    onChange={status.ui.toggleIsActive}
  />
)

export default observer(ActiveSwitchBox)
