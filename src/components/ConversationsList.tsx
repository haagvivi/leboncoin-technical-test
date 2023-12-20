import type { ReactElement } from 'react'
import { Conversation as ConversationType } from '../types/conversation'
import Conversation from './Conversation'
import styles from '../styles/ConversationsList.module.css'

interface ConversationsListProps {
  conversations: ConversationType[]
}

export const ConversationsList = ({
  conversations,
}: ConversationsListProps): ReactElement => {
  return (
    <ul className={styles.container}>
      {conversations.map((conversation: ConversationType) => (
        <Conversation key={conversation.id} conversation={conversation} />
      ))}
    </ul>
  )
}
