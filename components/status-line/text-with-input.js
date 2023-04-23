import { observer } from 'mobx-react'
import { useEventCallback } from '@frontend-kit/ui-components/hooks'
import classnames from 'classnames'
import i18n from 'modules/i18n'

import { TextInput } from 'components/inputs'
import Truncate from 'components/truncate'
import ActionGroup from './action-group'

const TextWithInput = ({ canSubmit = true, containerClassName, maxLength, name, status }) => {
  const { ui } = status
  const isEditing = ui.editingStates[name]

  const handleChange = useEventCallback(({ target: { value } }) => {
    ui.onChange(name, value)
  })
  const handleSave = useEventCallback(() => ui.onSave(name))
  const toggleEditing = useEventCallback(() => ui.toggleEditing(name))
  const handleEditingStart = useEventCallback(() => {
    if (isEditing) return

    toggleEditing()
  })

  return (
    <div
      className={classnames(
        'group relative flex h-8 items-center rounded border border-transparent pl-3 transition-colors',
        isEditing ? 'pr-16' : 'pr-8',
        {
          'border-highlight': isEditing,
          'hover:border-base-400': !isEditing,
        },
        containerClassName,
      )}
    >
      <div
        className="flex h-full min-w-0 flex-1 cursor-text items-center"
        onClick={handleEditingStart}
      >
        {isEditing ? (
          <TextInput
            autoFocus
            className="h-full border-0 pl-0"
            containerClassName="h-full"
            maxLength={maxLength}
            name={name}
            onChange={handleChange}
            placeholder={`${i18n.t(`activerecord.attributes.story_status.${name}`)}...`}
            value={ui[name]}
          />
        ) : (
          <Truncate className={classnames({ 'text-base-500': !status.isActive || !status[name] })}>
            {status[name] || i18n.t(`activerecord.placeholders.${name}`)}
          </Truncate>
        )}
      </div>

      <div
        className={classnames(
          'absolute right-0 top-1/2 flex h-6 shrink-0 -translate-y-1/2 items-center justify-end pr-1',
          'text-base-700 transition-opacity',
          {
            'opacity-0 group-hover:opacity-100': !isEditing,
          },
        )}
      >
        <ActionGroup
          canSubmit={canSubmit}
          isEdit={isEditing}
          isLoading={status.isLoading}
          onCancel={toggleEditing}
          onEdit={toggleEditing}
          onSave={handleSave}
        />
      </div>
    </div>
  )
}

export default observer(TextWithInput)
