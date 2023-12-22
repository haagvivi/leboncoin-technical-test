import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ConversationPage from '../pages/conversations/[id]'
import { SWRConfig } from 'swr'
import { RouterContext } from 'next/dist/shared/lib/router-context'
import { createMockRouter } from '../utils/tests'

import {
  mockMessages,
  mockNewMessage,
  mockMessagesWithNewOne,
  mockUser,
} from '../utils/mocks'

// //@ts-ignore
import { rest } from 'msw'
import { setupServer } from 'msw/node'

const server = setupServer(
  rest.get('http://localhost/undefined/messages/1', (req, res, ctx) =>
    res(ctx.json(mockMessages))
  ),
  rest.get('http://localhost/undefined/users/2', (req, res, ctx) =>
    res(ctx.json(mockUser))
  ),
  rest.post('http://localhost/undefined/messages/1', (req, res, ctx) =>
    res(ctx.json(mockNewMessage))
  )
)

jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
    query: {
      id: 1,
    },
  }),
}))

Element.prototype.scrollTo = () => {}

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('Conversation', () => {
  it('should render', async () => {
    render(<ConversationPage />)

    await waitForElementToBeRemoved(() => screen.queryByText('Loading...'))

    expect(
      screen.getByText(
        "Bonjour c'est le premier message de la première conversation"
      )
    )
  })

  it('should render the new added message in the conversation', async () => {
    // SWRConfig is used to wrap the application with an empty cache provider
    render(
      <SWRConfig value={{ provider: () => new Map() }}>
        <ConversationPage />
      </SWRConfig>
    )

    await waitForElementToBeRemoved(() => screen.queryByText('Loading...'))

    const expectedText =
      "Bonjour c'est le quatrième message de la première conversation"
    const input = screen.getByRole('textbox') as HTMLInputElement
    await userEvent.type(input, expectedText)

    // The second call should have the new message in the conversation
    server.use(
      rest.get('http://localhost/undefined/messages/1', (req, res, ctx) =>
        res(ctx.json(mockMessagesWithNewOne))
      )
    )

    const sendButton = screen.getByRole('button')
    await userEvent.click(sendButton)

    await expect(screen.getByText(expectedText)).toBeInTheDocument()
  })

  it('should go back to the homeage when click on return link', async () => {
    const router = createMockRouter({})
    render(
      <RouterContext.Provider value={router}>
        <ConversationPage />
      </RouterContext.Provider>
    )

    const returnLink = screen.getByRole('link')

    await userEvent.click(returnLink)
    expect(router.push).toHaveBeenCalledTimes(1)
  })
})
