Sample set of state
-------------------

```javascript
{
  entities: {
    workspaces: {
      32: {
        workspace_id: 32,
        workspace_name: "Indigo Blue",
        channel_ids: [4, 7, 12, 18]
      }, 
      ...
    },
    channels: {
      4: {
        channel_id: 4,
        channel_type: "public",
        channel_name: "Shades of Blue",
        channel_users: [13, 23, 24, 27, 34, 53],
        channel_messages: [3, 4, 6, 8, 12, 15]
      },
      17: {
        channel_id: 17,
        channel_type: "direct",
        channel_name: "Tameka Leuschke",
        channel_users: [23, 42],
        channel_messages: [84, 86, 87, 91, 93]
      },
      ...
    },
    messages: {
      8: {
        message_id: 8,
        message_text: "I think we should include verdant in the discussion",
        message_replies: [92],
        message_ts: 1582641194140,
        author_id: 27
      },
      92: {
        message_id: 92,
        message_text: "Look at the channel name.....",
        message_replies: false,
        message_ts: 1582641332077,
        author_id: 53
      },
      ...
    },
    users: {
      53: {
        user_id: 53,
        user_name: "Fredrick Muller",
        avatar_url: "aws.s3"
      },
      ...
    }
  },
  session: {
    currentUser: 23
  },
  ui: {
    loading: false
  },
  errors: {
    login: ["Incorrect username or password"],
    registration: ["Form <detail> cannot be blank"]
  }
}
```