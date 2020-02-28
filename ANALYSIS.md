Here is a rough analysis of the bootstrapping process which the web-based Slack client seems to go through. We hope to model our process after this.

NB: The following includes only xhr calls to Slack's API. There is presumably a lot going on over the WSS connectionn.

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
		ws_url: <wss://...>,
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
return current view for requested channel/thread:
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