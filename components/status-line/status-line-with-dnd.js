import { useRef } from 'react'
import { observer } from 'mobx-react'
import { useSortable } from 'hooks'
import compose from 'helpers/compose'
import withDndProvider from 'modules/with-dnd-provider'

import StatusLine from './index'

const StatusLineWithDnd = ({ index, status }) => {
  const itemToMoveRef = useRef(null)

  const { drag, isDragging } = useSortable({
    dropCallback: status.statusesStore.reorderStatuses,
    index,
    itemToMoveRef,
    moveCallback: status.statusesStore.moveStatus,
    type: 'storyStatus',
  })

  return <StatusLine dndProps={{ drag, isDragging, itemToMoveRef }} status={status} />
}

export default compose(withDndProvider, observer)(StatusLineWithDnd)
