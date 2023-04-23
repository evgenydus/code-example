import i18n from 'modules/i18n'

import { FontAwesomeIcon } from '@frontend-kit/ui-icons'
import { Typography } from '@frontend-kit/ui-components'

const Header = () => (
  <div className="ml-1 flex h-10 items-center gap-1 whitespace-nowrap border-x border-transparent pr-11 pl-10">
    <div className="flex w-10 flex-none items-center justify-center">
      <div className="flex h-5 w-5 items-center justify-center">
        <FontAwesomeIcon className="text-xs text-base-600" icon={['far', 'fill-drip']} />
      </div>
    </div>
    <div className="flex flex-1 gap-1">
      <div className="w-80 flex-none pl-3">
        <Typography variant="title-xxs">
          {i18n.t('activerecord.attributes.story_status.name')}
        </Typography>
      </div>
      <div className="flex-1 pl-3">
        <Typography variant="title-xxs">
          {i18n.t('activerecord.attributes.story_status.note')}
        </Typography>
      </div>
      <div className="w-12 flex-none text-center">
        <Typography variant="title-xxs">
          {i18n.t('activerecord.attributes.story_status.active')}
        </Typography>
      </div>
    </div>
  </div>
)

export default Header
