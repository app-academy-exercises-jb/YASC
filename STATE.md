Sample set of state
-------------------

```javascript
{
  entities: {
    workspaces: {
      32: {
        id: 32,
        name: "Indigo Blue",
        channels: [4, 7, 12, 18]
      }, 
      ...
    },
    channels: {
      4: {
        id: 4,
        type: "public",
        name: "Shades of Blue",
        users: [13, 23, 24, 27, 34, 53],
        messages: [3, 4, 6, 8, 12, 15]
      },
      17: {
        id: 17,
        type: "direct",
        name: "Tameka Leuschke",
        users: [23, 42],
        messages: [84, 86, 87, 91, 93]
      },
      ...
    },
    messages: {
      8: {
        id: 8,
        text: "I think we should include verdant in the discussion",
        is_reply: false,
        replies: [92],
        ts: 1582641194140,
        channel_id: 4,
        author_id: 23
      },
      92: {
        id: 92,
        text: "Look at the channel name.....",
        is_reply: true,
        ts: 1582641332077,
        channel_id: 4,
        author_id: 57
      },
      ...
    },
    users: {
      23: {
        id: 23,
        name: "Fredrick Muller",
        avatar_url: "aws.s3"
      },
      ...
    }
  },
  session: {
    current_user: 23,
    current_teams: [32],
    current_channels: [4, 17],
    current_threads: [8]
  },
  ui: {
    loading: false
  },
  errors: {
    login: {
      [key]: "Error message"
    },
    registration: {
      name: "Name field cannot be blank"
    }
  }
}
```