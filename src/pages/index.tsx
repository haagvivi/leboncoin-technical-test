import type { ReactElement } from 'react'
import { Conversation as ConversationType } from '../types/conversation'
import Conversation from '../components/Conversation'
import styles from '../styles/Home.module.css'
import { getLoggedUserId } from '../utils/getLoggedUserId'
import { getConversationsUrlByUserId } from '../utils/api'

interface HomeProps {
  conversations: ConversationType[]
}

const Home = ({ conversations }: HomeProps): ReactElement => {
  return (
    <div className={styles.container}>
      <ul className={styles.conversationsList}>
        {conversations.map((conversation: ConversationType) => (
          <Conversation key={conversation.id} conversation={conversation} />
        ))}
      </ul>
    </div>
  )
}

export const getServerSideProps = async () => {
  const userId: number = getLoggedUserId()
  const res = await fetch(getConversationsUrlByUserId(userId))
  const conversations: ConversationType[] = await res.json()

  return { props: { conversations } }
}

export default Home
