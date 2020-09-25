
const BASE_ENDPOINT = "https://www.googleapis.com";
const STORAGE_PREFIX = "hovva-youtube";

export default {
  BASE_API_ENDPOINT: `${BASE_ENDPOINT}/youtube/v3`,
  BASE_TOKEN_ENDPOINT: 'https://oauth2.googleapis.com/token',
  BASE_AUTH_ENDPOINT: 'https://accounts.google.com/o/oauth2/v2/auth',
  LOCALSTORAGE_KEY: `${STORAGE_PREFIX}-auth-store`,
  CHANNEL_DETAILS_KEY: `${STORAGE_PREFIX}-channel-details`,
  SEARCH_RESULTS_KEY: `${STORAGE_PREFIX}-search-results`,
  DEFAULT_THUMBNAIL_URL: 'http://s.ytimg.com/yts/img/no_thumbnail-vfl4t3-4R.jpg',
  DEFAULT_MAX_RESULT: 30,

  API_SCOPES: [
    `${BASE_ENDPOINT}/auth/youtube`,
    `${BASE_ENDPOINT}/auth/youtube.channel-memberships.creator`,
    `${BASE_ENDPOINT}/auth/youtube.force-ssl`,
    `${BASE_ENDPOINT}/auth/youtube.readonly`,
    `${BASE_ENDPOINT}/auth/youtube.upload`,
    `${BASE_ENDPOINT}/auth/youtubepartner`,
    `${BASE_ENDPOINT}/auth/youtubepartner-channel-audit`
  ]
};
