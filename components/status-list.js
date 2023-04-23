import { observer } from 'mobx-react'

import { ScrollBox, Spinner } from '@frontend-kit/ui-components'
import StatusLine from './status-line'
import StatusLineWithDnd from './status-line/status-line-with-dnd'

const StatusList = ({ statusesStore }) => {
  if (!statusesStore.isLoaded) return <Spinner className="text-primary" />

  const { statusesWithoutDnD, statusesWithDnD, postponedStatuses } = statusesStore

  return (
    <ScrollBox className="simplebar-h-full-content h-[calc(100%-2.5rem)] pr-3">
      <div className="flex flex-col gap-1 pb-5">
        {statusesWithoutDnD.length > 0 && (
          <>
            {statusesWithoutDnD.map((status, index) => (
              <StatusLine key={status.id} index={index} status={status} />
            ))}

            <hr className="my-3 h-px bg-base-300" />
          </>
        )}

        {statusesWithDnD.length > 0 && (
          <>
            {statusesWithDnD.map((status, index) => (
              <StatusLineWithDnd key={status.id} index={index} status={status} />
            ))}

            <hr className="my-3 h-px bg-base-300" />
          </>
        )}

        {postponedStatuses.map((status) => (
          <StatusLine key={status.id} status={status} />
        ))}
      </div>
    </ScrollBox>
  )
}

export default observer(StatusList)
