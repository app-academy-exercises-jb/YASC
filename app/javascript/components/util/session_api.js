export const signup = async user => {
  const res = await fetch('/api/users', {
    method: 'POST',
    headers: { 
      "Content-Type": "application/json",
      'X-CSRF-TOKEN': window.csrf
    },
    body: JSON.stringify({user})
  })
  return {
    ok: res.ok,
    res: await res.json()
  };
};

export const login = async user => {
  const res = await fetch('/api/session', {
    method: 'POST',
    headers: { 
      "Content-Type": "application/json",
      'X-CSRF-TOKEN': window.csrf
    },
    body: JSON.stringify({user})
  })
  return {
    ok: res.ok,
    res: await res.json()
  };
};

export const logout = async ({session_token}) => {
  const res = await fetch('/api/session', {
    method: 'DELETE',
    headers: { 
      "Content-Type": "application/json",
      'X-CSRF-TOKEN': window.csrf
    },
    body: JSON.stringify({session_token})
  })
  return {
    ok: res.ok,
    res: await res.json()
  };
};

export const logoutOthers = async ({session_token}) => {
  const res = await fetch('/api/session', {
    method: 'PATCH',
    headers: { 
      "Content-Type": "application/json",
      'X-CSRF-TOKEN': window.csrf
    },
    body: JSON.stringify({session_token})
  })
  return {
    ok: res.ok,
    res: await res.json()
  };
};