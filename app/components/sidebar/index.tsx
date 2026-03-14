import React from 'react'
import type { FC } from 'react'
import { useTranslation } from 'react-i18next'
import {
  ChatBubbleOvalLeftEllipsisIcon,
  PencilSquareIcon,
} from '@heroicons/react/24/outline'
import { ChatBubbleOvalLeftEllipsisIcon as ChatBubbleOvalLeftEllipsisSolidIcon } from '@heroicons/react/24/solid'
import Button from '@/app/components/base/button'
// import Card from './card'
import type { ConversationItem } from '@/types/app'

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

const MAX_CONVERSATION_LENTH = 20

export interface ISidebarProps {
  currentId: string
  onCurrentIdChange: (id: string) => void
  list: ConversationItem[]
}

const Sidebar: FC<ISidebarProps> = ({
  currentId,
  onCurrentIdChange,
  list,
}) => {
  const { t } = useTranslation()
  return (
    <div
      className="patriotic-chat-sessions shrink-0 flex flex-col overflow-y-auto pc:w-[244px] tablet:w-[192px] mobile:w-[240px] h-screen"
    >
      {list.length < MAX_CONVERSATION_LENTH && (
        <div className="flex flex-shrink-0 p-4 !pb-0">
          <Button
            onClick={() => { onCurrentIdChange('-1') }}
            className="patriotic-new-chat-btn group block w-full flex-shrink-0 !justify-start !h-9 items-center text-sm font-medium rounded-lg"
          >
            <PencilSquareIcon className="mr-2 h-4 w-4" /> {t('app.chat.newChat')}
          </Button>
        </div>
      )}

      <nav className="mt-4 flex-1 space-y-1 p-4 !pt-0">
        {list.map((item) => {
          const isCurrent = item.id === currentId
          const ItemIcon
            = isCurrent ? ChatBubbleOvalLeftEllipsisSolidIcon : ChatBubbleOvalLeftEllipsisIcon
          return (
            <div
              onClick={() => onCurrentIdChange(item.id)}
              key={item.id}
              className={classNames(
                'patriotic-session-item group flex items-center rounded-md px-2 py-2 text-sm font-medium cursor-pointer',
                isCurrent && 'current',
              )}
            >
              <ItemIcon
                className={classNames(
                  isCurrent ? 'text-[var(--text-gold)]' : 'text-gray-400 group-hover:text-[var(--text-gold)]',
                  'mr-3 h-5 w-5 flex-shrink-0',
                )}
                aria-hidden="true"
              />
              {item.name}
            </div>
          )
        })}
      </nav>
      {/* <a className="flex flex-shrink-0 p-4" href="https://langgenius.ai/" target="_blank">
        <Card><div className="flex flex-row items-center"><ChatBubbleOvalLeftEllipsisSolidIcon className="text-primary-600 h-6 w-6 mr-2" /><span>LangGenius</span></div></Card>
      </a> */}
    </div>
  )
}

export default React.memo(Sidebar)
