import { useState } from 'react'
import styles from '../styles/SendInput.module.css'
import { SendHorizontal } from 'lucide-react'

interface SendInputProps {
  onSubmit: (value: string) => void
}

export const SendInput = ({ onSubmit }: SendInputProps) => {
  const [value, setValue] = useState('')
  const [inputColor, setInputColor] = useState('#555')
  const handleInputFocus = () => setInputColor('#ec5a13')
  const handleInputBlur = () => setInputColor('#555')
  const handleInputChange = (e) => setValue(e.target.value)
  const handleButtonClick = () => {
    if (value !== '') {
      onSubmit(value)
      setValue('')
    }
  }
  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleButtonClick()
    }
  }

  return (
    <div className={styles.sendInput}>
      <button
        tabIndex={2}
        type="submit"
        className={styles.sendIcon}
        onClick={handleButtonClick}
      >
        <SendHorizontal color={inputColor} />
      </button>
      <input
        autoComplete="off"
        tabIndex={1}
        type="text"
        name="message"
        placeholder="Send message"
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        value={value}
      />
    </div>
  )
}
