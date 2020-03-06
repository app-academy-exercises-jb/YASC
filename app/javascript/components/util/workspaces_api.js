// POST   /api/workspaces => workspaces#create
export const createWorkspace = async workspace => {
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

// GET    /api/workspaces/:id => workspaces#show
// PUT    /api/workspaces/:id => workspaces#update
// DELETE /api/workspaces/:id => workspaces#destroy
// GET    /api/workspaces/:id/counts => workspaces#counts

// GET   /api/users/:id/workspaces => users#workspaces
export const getCurrentWorkspaces = async id => {
  const res = await fetch(`/api/users/${id}/workspaces`)
  return {
    ok: res.ok,
    res: await res.json()
  };
};

// POST   /api/workspaces/:id/members => workspaces#join
// DELETE /api/workspaces/:id/members => workspaces#leave