import type { ReactElement } from 'react'
import { Message as MessageType } from '../types/message'
import { User } from '../types/user'
import { Message } from './Message'
import { getLoggedUserId } from '../utils/getLoggedUserId'
import styles from '../styles/MessagesList.module.css'

interface MessagesListProps {
  messages: MessageType[]
  recipientUser: User
}

const MessagesList = ({
  messages,
  recipientUser,
}: MessagesListProps): ReactElement => {
  const userId = getLoggedUserId()
  return (
    <div className={styles.container}>
      {messages.map((message: MessageType): ReactElement => {
        const isOwnMessage = userId === message.authorId
        return (
          <div key={message.id}>
            {!isOwnMessage && (
              <div className={styles.senderName}>{recipientUser.nickname}</div>
            )}
            <Message message={message} isOwnMessage={isOwnMessage} />
          </div>
        )
      })}
    </div>
  )
}

export default MessagesList
