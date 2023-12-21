import type { ReactElement } from 'react'
import { Message as MessageType } from '../types/message'
import { Message } from './Message'
import { getLoggedUserId } from '../utils/getLoggedUserId'
import styles from '../styles/MessagesList.module.css'
import useSWR from 'swr'
import { fetcher } from '../utils/api'

interface MessagesListProps {
  messages: MessageType[]
}

const MessagesList = ({ messages }: MessagesListProps): ReactElement => {
  const userId = getLoggedUserId()
  const recipientMessage = messages.find(
    (message) => message.authorId !== userId
  )

  const recipientId =
    recipientMessage === undefined ? undefined : recipientMessage.authorId

  const { isLoading, data } = useSWR(`/users/${recipientId}`, fetcher)
  const recipientNickname = !isLoading ? data?.nickname : ''
  return (
    <div className={styles.container}>
      {messages.map((message: MessageType): ReactElement => {
        const isOwnMessage = userId === message.authorId
        return (
          <div key={message.id}>
            {!isOwnMessage && (
              <div className={styles.senderName}>{recipientNickname}</div>
            )}
            <Message message={message} isOwnMessage={isOwnMessage} />
          </div>
        )
      })}
    </div>
  )
}

export default MessagesList
