# YASC (Yet Another Slack Clone)

## <u>MVP Feature Set</u>:

0. Hosting on Heroku (3/2/20 -- ~4hrs)

1. Authentication Functionality (3/3/20 -- ~16hrs)
	- Registration
	- Multiple login
	- Demo login
	- __BONUS:__ Implement Auth0 login/registration functionality

2. Live Chat (3/5/20 -- ~24hrs)
	- Websocket functionality for client communication, with client storage of last known event_ts
	- Eventual consistency model around messages (see [Atomic Broadcast notes](#atomic-broadcast-notes)).
	- [Real-time Messaging Server](#architectural-design)
	- __BONUS:__ Client side pub/sub: client subscribes to list of users/channels that they are 'interested in', and only receive real-time notifications from those. this reduces the amount of events clients have to handle. examples include: presence updates
  
3. Workspace Functionality (3/7/20 -- ~16hrs)
	- Workspace creation -> Workspace admins
	- Workspace un/registration
	- Slack-like styling
	- Channel/User search

4. Channel Functionality (3/9/20 -- ~24hrs)
	- Channel creation -> Channel admins
	- Channel un/subscription
	- Slack-like styling
	- Typing/presence indicators
	- __BONUS:__ Auto-completing user mentions
	- __BONUS:__ Lazy Channels: as opposed to loading the full history of a given channel/thread, only load some of it, loading the rest on demand (ie, user scrolling)

5. Direct Messages (p2p, p2group) (3/11/20 -- ~24hrs)
	- Users can dm anyone in the same workspace
	- Users can enter/leave dms

6. Authorization Functionality (workspace, channel) (3/12/20 -- ~12hrs)
	- Workspace creators are workspace admin
	- Workspace admin may set permissions of other workspace users
	- Workspace users w/ clearance (ie. channel admins) may create channels
	- Channel admins may boot/mute channel users

7. Production Readme (3/13/20 -- ~4hrs)

8. __BONUS:__ Asynchronous Job Queue (~30hrs)
	- A central server which collects jobs in a queue and dispatches them to its collection of workers, on a first-available basis. The server returns the worker's results to the original caller.
	- Use cases:
		- Async URL unfurling for links shared in chat
    - User mention notifications
