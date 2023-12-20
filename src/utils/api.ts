export const getConversationsUrlByUserId = (userId: number): string =>
  `${process.env.NEXT_PUBLIC_API_ROOT}/conversations/${userId}`
