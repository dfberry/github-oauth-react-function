function getCookieValue(cookieName = '', cookie = '') {
    const matches = cookie.match(`(^|[^;]+)\\s*${cookieName}\\s*=\\s*([^;]+)`)
    return matches ? matches.pop() : ''
  }