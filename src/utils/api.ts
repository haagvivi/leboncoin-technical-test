import axios from 'axios'
export const fetcher = (url) =>
  axios.get(`${process.env.NEXT_PUBLIC_API_ROOT}${url}`).then((res) => res.data)

export const getConversationsUrlByUserId = (userId: number): string =>
  `${process.env.NEXT_PUBLIC_API_ROOT}/conversations/${userId}`

export const getMessagesUrlByMessageId = (messageId: number): string =>
  `${process.env.NEXT_PUBLIC_API_ROOT}/messages/${messageId}`

export const getAllUsers = (): string =>
  `${process.env.NEXT_PUBLIC_API_ROOT}/users`

export const getUserUrlByUserId = (userId: number): string =>
  `${process.env.NEXT_PUBLIC_API_ROOT}/users/${userId}`
