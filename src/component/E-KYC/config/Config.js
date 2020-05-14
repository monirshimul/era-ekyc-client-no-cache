export const config = {
    headers: {
      'x-auth-token': localStorage.getItem('authToken')
    }
  };