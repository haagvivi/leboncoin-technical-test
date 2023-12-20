import type { ReactElement } from 'react'
import styles from '../styles/Home.module.css'
import { Conversation } from '../types/conversation'
import { getLoggedUserId } from '../utils/getLoggedUserId'
import { ConversationsList } from '../components/ConversationsList'
import { getConversationsUrlByUserId } from '../utils/api'

interface HomeProps {
  conversations: Conversation[]
}

const Home = ({ conversations }: HomeProps): ReactElement => {
  return (
    <div className={styles.container}>
      <ConversationsList conversations={conversations} />
    </div>
  )
}

export const getServerSideProps = async () => {
  const userId: number = getLoggedUserId()
  const res = await fetch(getConversationsUrlByUserId(userId))
  const conversations: Conversation = await res.json()

  return { props: { conversations } }
}

export default Home
