import type { ReactElement } from 'react'
import Image from 'next/image'
import Profil from '../assets/profil.jpeg'
import { Conversation } from '../types/conversation'
import styles from '../styles/Conversation.module.css'
import { getLoggedUserId } from '../utils/getLoggedUserId'
import { getFormattedConversationDate } from '../utils/date'

interface ConversationProps {
  conversation: Conversation
}

const Conversation = ({ conversation }: ConversationProps): ReactElement => {
  const userId: number = getLoggedUserId()
  const conversationDate = getFormattedConversationDate(
    conversation.lastMessageTimestamp
  )
  return (
    <li className={styles.container}>
      <div>
        <Image
          className={styles.picture}
          src={Profil}
          alt="Picture Profil"
          priority={true}
          width={40}
          height={40}
        />
      </div>
      <div>
        <div>
          {conversation.recipientId !== userId
            ? conversation.recipientNickname
            : conversation.senderNickname}
        </div>
        <div className={styles.date}>{conversationDate}</div>
      </div>
    </li>
  )
}

export default Conversation
