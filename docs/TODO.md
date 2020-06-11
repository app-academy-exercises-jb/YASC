TODO

adds
----
- channels need topics+descriptions
- users need names

- in invite people screen, allow creation of multiple invitations

- user profile page in /app
- link to workspace settings from /app dropdown

- message thread view
- threads "channel"

- connect aws s3, enable custom workspace and user icons

- autocompleting user mentions

- create workspace page needs errors

changes
-------
- separate channels list into joined/not joined
- disable joinability for joined channels
- make sure private channels can't be seen in the channel list
- provide a way to add members to a private channel

- change password doesn't work
- workspaces needs a members index, where an admin can boot members from
- delete workspace item in workspace settings should not hover blue like it does

- messages need to be editable, deletable
- messages need to be able to be replied to

- when the application sits for a while and then you send a message it all gets messed up??
- disconnect from websocket on logout and exit

- we should not fetch messages for a channel until we flip to view it


done
----
✓ /app sidebar should be set at a certain width. names which are too long should ellipsis
✓ /app channel header gear icon needs cursor:pointer;
✓ workspaces dropdown on front page should have just enough space to accommodate 3 workspace icons w/out needing scrolling
✓ do some sort of confirm on confirmation of invite(maybe call /counts again. maybe just broadcast something over ws)
✓ pushing the history on demo bootstrapping should only happen after we get a response from the server about having been logged in 
✓ appropriate seeds for demo user
✓ chatbox at /app should be autoscrolling
