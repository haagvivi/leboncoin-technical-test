import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../pages'
import { RouterContext } from 'next/dist/shared/lib/router-context'
import { createMockRouter } from '../utils/tests'
import { mockConversations } from '../utils/mocks'

describe('App', () => {
  it('should render correctly App with 3 conversations', () => {
    render(<App conversations={mockConversations} />)
    expect(screen.getByText(/Jeremie/)).toBeInTheDocument()
    expect(screen.getAllByRole('img')).toHaveLength(3)
  })

  it('should call router.push after click conversation', async () => {
    const router = createMockRouter({})
    render(
      <RouterContext.Provider value={router}>
        <App conversations={mockConversations} />
      </RouterContext.Provider>
    )

    const link = screen.getByRole('link', {
      name: /picture profil jeremie 7 juillet 21/i,
    })

    await userEvent.click(link)

    expect(router.push).toHaveBeenCalledTimes(1)
  })
})
