export async function request(url, query) {
  url = new URL(process.env.baseUrl + url);
  if (query) {
    Object.keys(query).forEach(key => {
      let value = query[key];
      if (Array.isArray(value)) {
        value.forEach(v => url.searchParams.append(encodeURIComponent(key), encodeURIComponent(v)))
        return
      }
      url.searchParams.append(encodeURIComponent(key), value);
    })
  }
  const response = await fetch(url, {
    method: 'GET',
    credentials: 'include',
  });
  if (response.status > 200) {
    errorHandler(response)
    return { error: true }
  }
  return { error: false, response }
}


export async function postRequest(url, dataObject) {
  const response = await fetch(process.env.baseUrl + url, {
    method: 'POST',
    credentials: 'include',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(dataObject)
  });
  if (response.status > 200) {
    errorHandler(response)
    return { error: true }
  }
  return { error: false, response }
}

export async function authRequest(url, body) {
  const response = await fetch(process.env.baseUrl + url, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });
  return { error: response.status !== 200, response }
}

async function errorHandler(error) {
  const store = window.$nuxt.$store
  await store.dispatch('auth/logout')
  window.$nuxt.$router.replace('/login')
}
