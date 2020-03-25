// PUT    /api/users/:id => users#update
export const update = async user => {
  const res = await fetch(`/api/users/${user.id}`, {
    method: 'PUT',
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