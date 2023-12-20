import type { ReactElement } from 'react'
import { Message as MessageType } from '../types/message'
import styles from '../styles/Message.module.css'
import clsx from 'clsx'

interface MessageProps {
  message: MessageType
  isOwnMessage: boolean
}

export const Message = ({
  message,
  isOwnMessage,
}: MessageProps): ReactElement => {
  return (
    <div
      className={clsx(styles.container, {
        [styles.ownMessage]: isOwnMessage,
      })}
    >
      {message.body}
    </div>
  )
}
