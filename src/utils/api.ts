import axios from 'axios'

const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_ROOT}`,
})

export const fetcher = (url) => api.get(url).then((res) => res.data)

export const getConversationsUrlByUserId = (userId: number): string =>
  `${process.env.NEXT_PUBLIC_API_ROOT}/conversations/${userId}`

export const getMessagesUrlByMessageId = (messageId: number): string =>
  `${process.env.NEXT_PUBLIC_API_ROOT}/messages/${messageId}`

export const getAllUsers = (): string =>
  `${process.env.NEXT_PUBLIC_API_ROOT}/users`

export const getUserUrlByUserId = (userId: number): string =>
  `${process.env.NEXT_PUBLIC_API_ROOT}/users/${userId}`

export const addMessage = ({
  conversationId,
  body,
  authorId,
}: {
  conversationId: number
  body: string
  authorId: number
}) => {
  return api.post(`/messages/${conversationId}`, {
    body,
    timestamp: Date.now(),
    conversationId,
    authorId,
  })
}
