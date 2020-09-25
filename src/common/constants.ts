export const prompt: string = "consent";
export const response_type: string = "code"
export const access_type: string = "offline"
export const grant_type: string = "authorization_code"

export const VIEW_COUNT_FORMATS = [
  { // 0 - 999
    letter: '',
    limit: 1e3
  },
  { // 1,000 - 999,999
    letter: 'K',
    limit: 1e6
  },
  { // 1,000,000 - 999,999,999
    letter: 'M',
    limit: 1e9
  },
  { // 1,000,000,000 - 999,999,999,999
    letter: 'B',
    limit: 1e12
  }
];

export const PART = {
  CONTENT_DETAILS: "contentDetails",
  PLAYER: "player",
  SNIPPET: "snippet",
  STATISTICS: "statistics"
}