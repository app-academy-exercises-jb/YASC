Here is a rough analysis of the bootstrapping process which the web-based Slack client seems to go through. We hope to model our process after this.

## API analysis

---
	api/client.boot
returns snapshot of current connection: 
```javascript
	{
		ok: true,
		self: {
			id: "<id_hash>",
			team_id: "<team_id_hash>",
			display_name: "JB",
			name: "Jorge Barreto",
			profile: {name, avatar, email, team},
			is_admin: false,
			is_owner: false,
			updated: 1572650797
		},
		team: {
			id: "<id_hash>",
			name: "<team_id_hash>",
			prefs: {default_channels: ["<channel_id>", ...], ...},
			icon: "url",
			messages_count: 6064330,
			onboarding_channel_id: "<channel_id_hash>",
			date_created: 1479234539,
			limit_ts: 1582502400000000
		},
		latest_event_ts: 1582908788.000000,
		cache_ts: 1582909388,
		prefs: { ... },
		ws_url: <"wss://...">,
		is_open: ["<channel id>", ...],
		last_read: { [channel_id]: "<last_read_in_channel_ts>", ... },
		channels_latest: { [channel_id]: "<latest_event_in_channel_ts>", ... }
	}
```
---
	api/client.counts
return result of cache coherency protocol:
```javascript
	{
		ok: true,
		threads: { 
			has_unreads: false,
			mention_count: 0,
			mention_count_by_channel: {}
		},
		channels: [{
			id:,
			has_unreads: true,
			latest_ts:,
			last_read_ts:
		}, ...],
		ims: [{
			id:,
			has_unreads: false,
			last_read_ts:
		}, ...]
	}
```
---
	api/conversations.view
return current view for requested channel/thread. seemingly, this is only hit on initial page load, not when switching channels
```javascript
	{
		ok: true,
		history: {
			ok: true,
			messages:[ {
				client_msg_id:,
				type:,
				text:,
				user:,
				ts:,
				team_id:,
				reply_count:,
				latest_reply_ts:,
				reply_users:["<user_ids>"],
				replies: [{user_id:, ts:}, ...]}, ...],
				subscribed: false
			}, ...],
			has_more: true,
			next_ts:
		},
		users: [{
			id:,
			team_id:,
			display_name:,
			real_name:,
			profile:{"<see above>"},
			is_admin:,
			is_owner:,
			updated_ts:
		}, ...],
		channel: {
			id:,
			name:,
			is_channel:,
			is_group:,
			created_ts:,
			is_general:,
			parent_conversation:,
			creator_id:,
			is_read_only:,
			is_member:,
			last_read_ts:,
			latest_ts:, 
			unread_count:
			topic: {value:,creator_id:,last_set_ts:}
		}
	}
```
---
	api/users.channelSections.list
returns information to populate SideBar component headers.
```javascript
	{
		ok: true,
		channel_sections:[{id:, name:"Channels", type:, last_updated_ts:, }, ...]
	}
```
---
	api/users.info
gets user info according to params
```javascript
	{
		ok: true,
    results: [{"<same as users section items in conversations.view, above>"}, ...],
    presence_active_ids: ["<user_id>", ...]
	}
```
---
	api/conversations.history
this is hit every time we switch channels, followed by `api/users.counts`.
```javascript
	{
		<same_as_conversations.view[history], above>
	}
```
---
	api/chat.postMessage
this is hit every time we post a message (why?), sometime after(?) the WS event is sent. form data is sent containing the message content, and the server responds with the published message event:
```javascript
	{
		ok: true,
		channel: "<channel_id>",
		ts: "1582917798.015000",
		message: {
			client_msg_id:,
			type: "message",
			text: "this is the msg",
			user: "<user_id>",
			ts: "1582917798.015000",
			team: "<team_id>",
			blocks: "rich_text"::"rich_text_section"::"text"::":message_content"
		}
	}
```
---
	api/conversations.mark
this is hit every time that we mark a message as "seen"
```javascript
	{
		ok: true
  }
```
---
---
---

## WS analysis
The following is a list of chronologically ordered messages.
  * [INC] === "incoming"
  * [OUT] === "outgoing"

```javascript
[INC]{
  type: "hello",
  self: {
    id: "<id_hash>",
    team_id: "<team_id_hash>",
    display_name: "JB",
    name: "Jorge Barreto",
    profile: {name, avatar, email, team},
    is_admin: false,
    is_owner: false,
    updated: 1572650797
  },
  start: {
    rtm_start: {
      ok: true,
      url: <"wss://..".>
    }
  }
}
```

```javascript
[OUT]{
  type: "flannel",
  subtype: "user_unsubscribe_request",
  ids: [<"channel_id>", ...],
  id: 16385
}
```
NB: `id` in the above refers to the message id.

```javascript
[INC]{
  type: "reconnect_url",
  url: <"wss://..".>
}
```

```javascript
[INC]{
  ok: false,
  reply_to: 16385,
  error: {msg:, code:, source:}
}
```

```javascript
[OUT]{
  type: "presence_sub",
  ids: ["<user_id>", ...],
  id: 16386
}
```

```javascript
[INC]{
  type: "presence_change",
  presence: "active",
  users: ["<user_id>", ...]
}
```

```javascript
[OUT]{
  type: "presence_sub",
  ids: ["<user_id>", ...],
  id: 16387
}
```

```javascript
[OUT]{
  type: "flannel",
  presence: "user_subscribe_request",
  updated_ids: {"<channel_id>":, "<last_read_ts?>"},
  id: 16392
}
```

```javascript
[INC]{
  ok: true,
  reply_to: 16392,
  type: "flannel",
  subtype: "user_subscribe_response",
  error: {msg:, code:, source:},
  updated_ids: {"<channel_id>":, "<latest_event_ts?>"}
}
```

```javascript
[OUT]{
  type: "ping",
  id: 16394
}
```

```javascript
[INC]{
  type: "pong",
  reply_to: 16394
}
```

```javascript
[INC]{
  type: "im_marked",
  channel: "<channel_id>",
  ts: "<ts_as_sent?>",
  dm_count: 0,
  unread_count_display: 0,
  num_mentions_display: 0,
  event_ts: "<ts_as_logged?>"
}
```

```javascript
[OUT]{
  type: "typing",
  id: 16417
}
```

```javascript
[INC]{
  type: "message",
  client_msg_id:,
  text: "this is the message",
  user: "<user_id>",
  team: "<team_id>",
  blocks: "<see above, `api/chat.postMessage`>",
  channel: "<channel_id>",
  event_ts: "1582917798.015000",
  ts: "1582917798.015000"
}
```

```javascript
[INC]{
  type: "channel_marked",
  channel: "<channel_id>",
  ts:,
  unread_count: 0,
  num_mentions: 0,
  mention_count: 0,
  event_ts:
}
```