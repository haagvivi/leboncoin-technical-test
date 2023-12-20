export const getFormattedConversationDate = (timestamp: number): string => {
  const date = new Date(timestamp * 1000)

  const options: Intl.DateTimeFormatOptions = {
    year: '2-digit',
    month: 'long',
    day: 'numeric',
  }

  const formattedDate = new Intl.DateTimeFormat('fr-FR', options).format(date)
  return formattedDate
}
