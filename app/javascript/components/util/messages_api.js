// GET    /api/channels/:channel_id/messages
export const get = async id => {
  const res = await fetch(`/api/channels/${id}/messages`)
  return {
    ok: res.ok,
    res: await res.json()
  };
}

// POST   /api/channels/:channel_id/messages
export const create = async ({body, channel_id, parent_message_id}) => {
  const res = await fetch(`/api/channels/${channel_id}/messages`, {
    method: 'POST',
    headers: { 
      "Content-Type": "application/json",
      'X-CSRF-TOKEN': window.csrf
    },
    body: JSON.stringify({message: {body, parent_message_id}})
  })
  return {
    ok: res.ok,
    res: await res.json()
  };
};

// PUT    /api/channels/:channel_id/messages/:id
export const update = async ({body, channel_id, parent_message_id, id}) => {
  const res = await fetch(`/api/channels/${channel_id}/messages/${id}`, {
    method: 'PUT',
    headers: { 
      "Content-Type": "application/json",
      'X-CSRF-TOKEN': window.csrf
    },
    body: JSON.stringify({message: {body, parent_message_id}})
  });
  return {
    ok: res.ok,
    res: await res.json()
  };
};

// DELETE /api/channels/:channel_id/messages/:id
export const del = async ({ id, channel_id }) => {
  const res = await fetch(`/api/channels/${channel_id}/messages/${id}`, {
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