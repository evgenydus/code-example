import { flow, getParentOfType, types } from 'mobx-state-tree'
import { logError } from '@frontend-kit/ui-utils'

import { ConfidenceStatusesStore } from './index'
import StatusUI from './status-ui'
import api from './api'

const Status = types
  .model({
    color: types.maybeNull(types.string),
    defaultColor: types.maybeNull(types.string),
    id: 0,
    isArchived: false,
    isOutdated: false,
    name: '',
    note: '',
    ui: types.optional(StatusUI, {}),
  })
  .volatile(() => ({
    isLoading: false,
  }))
  .views((self) => ({
    // FYI: currently `outdated` status is required
    get ableToArchive() {
      return !self.isOutdated
    },

    get canSubmitName() {
      const { name } = self.ui

      return name.length > 0
    },

    get isActive() {
      return !self.isArchived
    },

    get statusesStore() {
      return getParentOfType(self, ConfidenceStatusesStore)
    },
  }))
  .actions((self) => ({
    setIsLoading(value) {
      self.isLoading = value
    },

    update: flow(function* update(params, onUpdate) {
      self.setIsLoading(true)

      try {
        yield api.updateConfidenceStatus(self.id, { confidence_status: params }).then(onUpdate)
      } catch (error) {
        logError('Status | update', error)
      } finally {
        self.setIsLoading(false)
      }
    }),
  }))

export default Status
