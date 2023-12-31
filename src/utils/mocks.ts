import { Message } from '../types/message'

export const mockMessages: Message[] = [
  {
    id: 1,
    conversationId: 1,
    timestamp: 1625637849,
    authorId: 1,
    body: "Bonjour c'est le premier message de la première conversation",
  },
  {
    id: 2,
    conversationId: 1,
    timestamp: 1625637867,
    authorId: 1,
    body: "Bonjour c'est le second message de la première conversation",
  },
  {
    id: 3,
    conversationId: 1,
    timestamp: 1625648667,
    authorId: 2,
    body: "Bonjour c'est le troisième message de la première conversation",
  },
]

export const mockNewMessage: Message = {
  id: 4,
  conversationId: 1,
  timestamp: 1645648667,
  authorId: 2,
  body: "Bonjour c'est le quatrième message de la première conversation",
}

export const mockMessagesWithNewOne = [...mockMessages, mockNewMessage]

export const mockUser = {
  id: 2,
  nickname: 'Jeremie',
  token: 'xxxx',
}

export const mockConversations = [
  {
    id: 1,
    recipientId: 2,
    recipientNickname: 'Jeremie',
    senderId: 1,
    senderNickname: 'Thibaut',
    lastMessageTimestamp: 1625637849,
  },
  {
    id: 2,
    recipientId: 3,
    recipientNickname: 'Patrick',
    senderId: 1,
    senderNickname: 'Thibaut',
    lastMessageTimestamp: 1620284667,
  },
  {
    id: 3,
    recipientId: 1,
    recipientNickname: 'Thibaut',
    senderId: 4,
    senderNickname: 'Elodie',
    lastMessageTimestamp: 1625648667,
  },
]
