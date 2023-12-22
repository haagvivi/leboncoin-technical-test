import { getFormattedConversationDate } from '../date'

describe('getFormattedConversationDate', () => {
  it('should return the correct date format', () => {
    expect(getFormattedConversationDate(1625637849)).toEqual('7 juillet 21')
  })
})
