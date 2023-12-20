type SharedHeadersType = {
  userSessionToken: string
  currentCity: string
}

export const sharedHeaders: SharedHeadersType = {
  userSessionToken: 'x-user-session-token',
  currentCity: 'x-current-city'
}