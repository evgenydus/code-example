import { observer } from 'mobx-react'
import classnames from 'classnames'

import { FontAwesomeIcon } from '@frontend-kit/ui-icons'

const DragButton = ({ dragRef }) => (
  <button
    ref={dragRef}
    className={classnames(
      'flex h-8 w-8 cursor-grab items-center justify-center rounded transition-colors',
      'hover:bg-base-200 active:cursor-grabbing',
    )}
    type="button"
  >
    <FontAwesomeIcon className="text-lg text-base-600" icon={['far', 'grip-dots-vertical']} />
  </button>
)

export default observer(DragButton)
