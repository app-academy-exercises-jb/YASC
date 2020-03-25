// POST   /api/channels => channels#create
export const create = async channel => {
  const res = await fetch('/api/channels', {
    method: 'POST',
    headers: { 
      "Content-Type": "application/json",
      'X-CSRF-TOKEN': window.csrf
    },
    body: JSON.stringify({channel})
  })
  return {
    ok: res.ok,
    res: await res.json()
  };
};

// GET    /api/channels/:id => channels#show
export const get = async id => {
  const res = await fetch(`/api/channels/${id}`)
  return {
    ok: res.ok,
    res: await res.json()
  };
}

// GET    /api/channels/:id/counts => channels#counts
export const getCounts = async id => {
  const res = await fetch(`/api/channels/${id}/counts`)
  return {
    ok: res.ok,
    res: await res.json()
  };
}

// PUT    /api/channels/:id => channels#update
export const update = async channel => {
  const { name, workspace_id, channel_type } = channel,
    res = await fetch(`/api/channels/${channel.id}`, {
    method: 'PUT',
    headers: { 
      "Content-Type": "application/json",
      'X-CSRF-TOKEN': window.csrf
    },
    body: JSON.stringify({name, workspace_id, channel_type})
  })
  return {
    ok: res.ok,
    res: await res.json()
  };
};

// DELETE /api/channels/:id => channels#destroy
export const del = async ({ id }) => {
  const res = await fetch(`/api/channels/${id}`, {
    method: 'DELETE',
    headers: { 
      "Content-Type": "application/json",
      'X-CSRF-TOKEN': window.csrf
    }
  })
  return {
    ok: res.ok,
    res: await res.json()
  };
};

// POST   /api/channels/:id/members => channels#join
export const join = async id => {
  const res = await fetch(`/api/channels/${id}/members`, {
    method: 'POST',
    headers: { 
      "Content-Type": "application/json",
      'X-CSRF-TOKEN': window.csrf
    }
  })
  return {
    ok: res.ok,
    res: await res.json()
  };
};

// DELETE /api/channels/:id/members => channels#leave
export const leave = async id => {
  const res = await fetch(`/api/channels/${id}/members`, {
    method: 'DELETE',
    headers: { 
      "Content-Type": "application/json",
      'X-CSRF-TOKEN': window.csrf
    }
  })
  return {
    ok: res.ok,
    res: await res.json()
  };
};