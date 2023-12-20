import type { ReactElement } from 'react'
import Link from 'next/link'
import { Message } from '../../types/message'
import { User } from '../../types/user'
import { getMessagesUrlByMessageId, getUserUrlByUserId } from '../../utils/api'
import { getLoggedUserId } from '../../utils/getLoggedUserId'
import MessagesList from '../../components/MessagesList'
import styles from '../../styles/ConversationPage.module.css'
import { ArrowBigLeft, MessageCircleOff } from 'lucide-react'

interface ConversationPageProps {
  messages: Message[]
  recipientUser: User
}

const ConversationPage = ({
  messages,
  recipientUser,
}: ConversationPageProps): ReactElement => {
  return (
    <div className={styles.container}>
      <div className={styles.navbar}>
        <Link href="/">
          <ArrowBigLeft color="#ec5a13" />
        </Link>
      </div>
      <div className={styles.conversationsList}>
        {messages.length === 0 && (
          <div className={styles.emptyMessage}>
            <MessageCircleOff color="#ec5a13" />
            <div>There is no message.</div>
          </div>
        )}
        {messages.length !== 0 && (
          <MessagesList messages={messages} recipientUser={recipientUser} />
        )}
      </div>
    </div>
  )
}

export const getServerSideProps = async ({ params }) => {
  const userId = getLoggedUserId()
  const res = await fetch(getMessagesUrlByMessageId(params.id))
  const messages: Message[] = await res.json()

  const recipientMessage = messages.find(
    (message) => message.authorId !== userId
  )

  if (recipientMessage === undefined) {
    return { props: { messages, recipientUser: {} } }
  }

  const userResult = await fetch(getUserUrlByUserId(recipientMessage.authorId))
  const recipientUser: User = await userResult.json()

  return { props: { messages, recipientUser } }
}

export default ConversationPage
