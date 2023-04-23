import { observer } from 'mobx-react'
import i18n from 'modules/i18n'

import { MiniFormButtons } from 'components/inputs'
import IconWithTooltip from 'components/icon-with-tooltip'

const ActionGroup = ({ canSubmit = true, isEdit, isLoading, onCancel, onEdit, onSave }) =>
  isEdit ? (
    <MiniFormButtons
      canSubmit={canSubmit}
      isSubmitting={isLoading}
      onCancel={onCancel}
      onSubmit={onSave}
    />
  ) : (
    <IconWithTooltip
      className="flex h-6 w-6 items-center justify-center rounded transition-colors hover:bg-base-200 hover:text-primary-highlight"
      icon={['far', 'pencil']}
      iconProps={{ className: 'text-base' }}
      onClick={onEdit}
      tag="button"
      tooltip={i18n.t('actions.edit')}
      type="button"
    />
  )

export default observer(ActionGroup)
