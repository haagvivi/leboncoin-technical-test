import { useState, type ReactElement, type ReactNode, useRef } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import MessagesList from '../../components/MessagesList'
import styles from '../../styles/ConversationPage.module.css'
import {
  ArrowBigLeft,
  MessageCircleOff,
  MessageCircleMore,
  SendHorizontal,
} from 'lucide-react'
import { fetcher, addMessage } from '../../utils/api'
import useSWR from 'swr'
import { getLoggedUserId } from '../../utils/getLoggedUserId'

const ConversationPageLayout = ({
  children,
  handleSubmit,
}: {
  children: ReactNode
  handleSubmit: (value: string) => void
}): ReactElement => {
  const [value, setValue] = useState('')
  const [inputColor, setInputColor] = useState('#555')
  const handleInputFocus = () => setInputColor('#ec5a13')
  const handleInputBlur = () => setInputColor('#555')
  const handleInputChange = (e) => setValue(e.target.value)
  const handleButtonClick = () => {
    if (value !== '') {
      handleSubmit(value)
      setValue('')
    }
  }
  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleButtonClick()
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.navbar}>
        <Link href="/">
          <ArrowBigLeft color="#ec5a13" />
        </Link>
      </div>
      <div className={styles.conversationsList}>{children}</div>
      <div className={styles.sendInput}>
        <button
          tabIndex={2}
          type="submit"
          className={styles.sendIcon}
          onClick={handleButtonClick}
        >
          <SendHorizontal color={inputColor} />
        </button>
        <input
          tabIndex={1}
          type="text"
          name="message"
          placeholder="Send message"
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          value={value}
        />
      </div>
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
