import { getParentOfType, types } from 'mobx-state-tree'

import Status from './status'

const editingStates = types.model({ name: false, note: false })

const StatusUI = types
  .model({
    editingStates: types.optional(editingStates, {}),
    name: '',
    note: '',
  })
  .views((self) => ({
    get statusData() {
      return getParentOfType(self, Status)
    },
  }))
  .actions((self) => ({
    onChange(attribute, value) {
      self[attribute] = value
    },

    onSave(attribute) {
      return self.statusData.update({ [attribute]: self[attribute] }, () =>
        self.toggleEditing(attribute),
      )
    },

    setColor(color) {
      self.color = color.color
      self.statusData.update(color)
    },

    toggleEditing(attribute) {
      self[attribute] = self.statusData[attribute]
      self.editingStates[attribute] = !self.editingStates[attribute]
    },

    toggleIsActive() {
      self.statusData.update({ archived: !self.statusData.isArchived })
    },
  }))

export default StatusUI
