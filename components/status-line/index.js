import { observer } from 'mobx-react'
import { getColorOption } from 'helpers/colors'
import { predefinedStoryStatusColors } from 'constants/color-picker'
import classnames from 'classnames'
import i18n from 'modules/i18n'

import ColorPicker from 'components/color-picker'
import ColorMark from 'components/color-picker/color-mark'
import InfoIcon from 'components/info-icon'
import ActiveSwitchBox from './active-switch-box'
import DragButton from './drag-button'
import TextWithInput from './text-with-input'

const optionsForPredefined = predefinedStoryStatusColors.map(getColorOption)
const statusNameMaxLength = 30
const statusNoteMaxLength = 255

const StatusLine = ({ status, dndProps }) => {
  const { drag, isDragging, itemToMoveRef } = dndProps || {}

  return (
    <div
      ref={itemToMoveRef}
      className={classnames(
        'relative flex h-12 items-center gap-1 rounded border bg-white pr-8 transition-all',
        'hover:border-base-400',
        {
          'bg-base-300 opacity-10': dndProps && isDragging,
          'pl-11': !dndProps,
        },
      )}
    >
      {dndProps && (
        <div className="flex w-10 flex-none items-center justify-center">
          <DragButton dragRef={drag} />
        </div>
      )}
      <div className="flex w-10 flex-none items-center justify-center">
        {status.statusesStore.hasExtendedAccess ? (
          <ColorPicker
            color={status.color}
            defaultColor={status.defaultColor}
            onChange={status.ui.setColor}
            selectorProps={{ optionsForPredefined }}
            variant="popover"
          />
        ) : (
          <ColorMark color={status.color} isClickable={false} />
        )}
      </div>
      <TextWithInput
        canSubmit={status.canSubmitName}
        containerClassName="w-80 flex-none"
        maxLength={statusNameMaxLength}
        name="name"
        status={status}
      />
      <TextWithInput
        containerClassName="min-w-0 flex-1"
        maxLength={statusNoteMaxLength}
        name="note"
        status={status}
      />
      {status.isCompleted && <InfoIcon tooltip={i18n.t('activerecord.tooltips.completed_info')} />}
      <div className="flex w-12 flex-none items-center justify-center">
        <ActiveSwitchBox status={status} />
      </div>
    </div>
  )
}

export default observer(StatusLine)
