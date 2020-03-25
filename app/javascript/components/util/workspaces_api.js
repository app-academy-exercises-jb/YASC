// POST   /api/workspaces => workspaces#create
export const create = async workspace => {
  const res = await fetch('/api/workspaces', {
    method: 'POST',
    headers: { 
      "Content-Type": "application/json",
      'X-CSRF-TOKEN': window.csrf
    },
    body: JSON.stringify({workspace})
  })
  return {
    ok: res.ok,
    res: await res.json()
  };
};

// GET    /api/workspaces/:id/boot => workspaces#boot
export const boot = async id => {
  const res = await fetch(`/api/workspaces/${id}/boot`)
  return {
    ok: res.ok,
    res: await res.json()
  };
}

// PUT    /api/workspaces/:id => workspaces#update
export const update = async workspace => {
  const res = await fetch(`/api/workspaces/${workspace.id}`, {
    method: 'PUT',
    headers: { 
      "Content-Type": "application/json",
      'X-CSRF-TOKEN': window.csrf
    },
    body: JSON.stringify({workspace})
  })
  return {
    ok: res.ok,
    res: await res.json()
  };
};

// DELETE /api/workspaces/:id => workspaces#destroy
export const del = async ({ id }) => {
  const res = await fetch(`/api/workspaces/${id}`, {
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

// GET    /api/workspaces/:id/counts => workspaces#counts

// GET   /api/users/:id/workspaces => users#workspaces
export const getCurrent = async ({ id }) => {
  const res = await fetch(`/api/users/${id}/teams`)
  return {
    ok: res.ok,
    res: await res.json()
  };
};

// POST   /api/workspaces/:id/members => workspaces#join
// DELETE /api/workspaces/:id/members => workspaces#leave