import { type ReactElement, type ReactNode, useRef } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import MessagesList from '../../components/MessagesList'
import styles from '../../styles/ConversationPage.module.css'
import { ArrowBigLeft, MessageCircleOff, MessageCircleMore } from 'lucide-react'
import { fetcher, addMessage } from '../../utils/api'
import useSWR from 'swr'
import { getLoggedUserId } from '../../utils/getLoggedUserId'
import { SendInput } from '../../components/SendInput'

const ConversationPageLayout = ({
  children,
  handleSubmit,
}: {
  children: ReactNode
  handleSubmit: (value: string) => void
}): ReactElement => {
  return (
    <div className={styles.container}>
      <div className={styles.navbar}>
        <Link href="/">
          <ArrowBigLeft color="#ec5a13" />
        </Link>
      </div>
      <div className={styles.conversationsList}>{children}</div>
      <SendInput onSubmit={handleSubmit} />
    </div>
  )
}

const ConversationPage = (): ReactElement => {
  const messagesContainer = useRef(null)
  const router = useRouter()
  const conversationId = Number(router.query.id)
  const userId = getLoggedUserId()
  const {
    isLoading,
    data: messages,
    mutate,
  } = useSWR(`/messages/${conversationId}`, fetcher)

  const handleSubmit = async (body) => {
    await addMessage({ conversationId, body, authorId: userId })
    await mutate()
    messagesContainer.current.scrollTo({
      top: messagesContainer.current.scrollHeight,
      behavior: 'smooth',
    })
  }

  if (isLoading) {
    return (
      <ConversationPageLayout handleSubmit={handleSubmit}>
        <div className={styles.infoCenter}>
          <MessageCircleMore color="#ec5a13" />
          <div>Loading...</div>
        </div>
      </ConversationPageLayout>
    )
  }

  return (
    <ConversationPageLayout handleSubmit={handleSubmit}>
      <>
        {messages.length === 0 && (
          <div className={styles.infoCenter}>
            <MessageCircleOff color="#ec5a13" />
            <div>There is no message.</div>
          </div>
        )}
        {messages.length !== 0 && (
          <div className={styles.messagesContainer} ref={messagesContainer}>
            <MessagesList messages={messages} />
          </div>
        )}
      </>
    </ConversationPageLayout>
  )
}

export default ConversationPage
