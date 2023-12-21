import type { ReactElement, ReactNode } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import MessagesList from '../../components/MessagesList'
import styles from '../../styles/ConversationPage.module.css'
import { ArrowBigLeft, MessageCircleOff, MessageCircleMore } from 'lucide-react'
import { fetcher } from '../../utils/api'
import useSWR from 'swr'

const ConversationPageLayout = ({
  children,
}: {
  children: ReactNode
}): ReactElement => {
  return (
    <div className={styles.container}>
      <div className={styles.navbar}>
        <Link href="/">
          <ArrowBigLeft color="#ec5a13" />
        </Link>
      </div>
      <div className={styles.conversationsList}>{children}</div>
    </div>
  )
}

const ConversationPage = (): ReactElement => {
  const router = useRouter()
  const { isLoading, data: messages } = useSWR(
    `/messages/${router.query.id}`,
    fetcher
  )

  if (isLoading) {
    return (
      <ConversationPageLayout>
        <div className={styles.infoCenter}>
          <MessageCircleMore color="#ec5a13" />
          <div>Loading...</div>
        </div>
      </ConversationPageLayout>
    )
  }

  return (
    <ConversationPageLayout>
      <>
        {messages.length === 0 && (
          <div className={styles.infoCenter}>
            <MessageCircleOff color="#ec5a13" />
            <div>There is no message.</div>
          </div>
        )}
        {messages.length !== 0 && <MessagesList messages={messages} />}
      </>
    </ConversationPageLayout>
  )
}

export default ConversationPage
