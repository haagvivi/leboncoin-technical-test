import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { SendInput } from '../components/SendInput'

const expected = 'hello test'

describe('SendInput', () => {
  it('should fill correctly when typing', async () => {
    const mockHandleSubmit = jest.fn(() => {})
    render(<SendInput onSubmit={mockHandleSubmit} />)
    const input = screen.getByRole('textbox') as HTMLInputElement

    await userEvent.type(input, expected)

    expect(input.value).toBe(expected)
  })

  it('should call handleSubmit and clean the input after submit', async () => {
    const mockHandleSubmit = jest.fn(() => {})
    render(<SendInput onSubmit={mockHandleSubmit} />)
    const input = screen.getByRole('textbox') as HTMLInputElement
    await userEvent.type(input, expected)

    const sendButton = screen.getByRole('button')
    await userEvent.click(sendButton)
    expect(mockHandleSubmit).toBeCalled()
    expect(input.value).toBe('')
  })

  it('should call handleSubmit when ENTER key is press', async () => {
    const mockHandleSubmit = jest.fn(() => {})
    render(<SendInput onSubmit={mockHandleSubmit} />)
    const input = screen.getByRole('textbox') as HTMLInputElement
    await userEvent.type(input, expected)

    await userEvent.keyboard('[Enter]')
    expect(mockHandleSubmit).toBeCalled()
  })
})
