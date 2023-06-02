import { minimalDistance } from './index'

describe('minimalDistance', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  test('Should return correct minimal distance and transformations', () => {
    const testCases = [
      { word1: 'wordone', word2: 'wordtwo', expected: 'wordone' }
    ]

    testCases.forEach(({ word1, word2, expected }) => {
      const spy = jest.spyOn(console, 'log')
      minimalDistance(word1, word2)
      const calls = spy.mock.calls
      expect(calls[calls.length - 5][0]).toBe(3)
      expect(calls[calls.length - 4][0]).toBe('wordtwo')
      expect(calls[calls.length - 3][0]).toBe('wordtwe')
      expect(calls[calls.length - 2][0]).toBe('wordtne')
      expect(calls[calls.length - 1][0]).toBe(expected)
      spy.mockRestore()
    })
  })
})
