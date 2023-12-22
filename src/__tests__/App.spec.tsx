import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../pages'
import { RouterContext } from 'next/dist/shared/lib/router-context'
import { createMockRouter } from '../utils/tests'

const conversations = [
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

describe('App', () => {
  it('should render correctly App with 3 conversations', () => {
    render(<App conversations={conversations} />)
    expect(screen.getByText(/Jeremie/)).toBeInTheDocument()
    expect(screen.getAllByRole('img')).toHaveLength(3)
  })

  it('should call router.push after click conversation', async () => {
    const router = createMockRouter({})
    render(
      <RouterContext.Provider value={router}>
        <App conversations={conversations} />
      </RouterContext.Provider>
    )

    const link = screen.getByRole('link', {
      name: /picture profil jeremie 7 juillet 21/i,
    })

    await userEvent.click(link)

    expect(router.push).toHaveBeenCalledTimes(1)
  })
})
