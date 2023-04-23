import { observer } from 'mobx-react'

import Breadcrumbs from 'containers/strategy/breadcrumbs'
import Header from './header'
import StatusList from './status-list'

const Statuses = ({ statusSettings, statusesStore, tabsMenuComponent }) => (
  <>
    <Breadcrumbs />

    {tabsMenuComponent && (
      <div className="layout-row-tools flex justify-between gap-2 px-8">
        {tabsMenuComponent}
        {statusSettings}
      </div>
    )}

    <div className="relative h-full bg-backdrop pt-5 pl-8 pr-5">
      {statusesStore.isLoaded && <Header />}
      <StatusList statusesStore={statusesStore} />
    </div>
  </>
)

export default observer(Statuses)
