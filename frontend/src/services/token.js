const makeConfig = (then) => {
  const loggedUserJSON = window.localStorage.getItem('maiznicafloraUser')
  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON)
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    }
    return config
  } else {
    console.error('no token')
  }
}

export default makeConfig
