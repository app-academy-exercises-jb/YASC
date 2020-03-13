# YASC (Yet Another Slack Clone)

YASC aims to be a lightweight, team-oriented messaging solution with strong guarantees around message integrity and availability. The following features represent the bare minimum in terms of what is required to make this project a reality. Not all of the features are yet fully operational. This notice will be removed when they are.

## <u>MVP Feature Set</u>:

1. Authentication Functionality
	- Registration
	- Multiple login
	- Demo login
	- __BONUS:__ Implement Auth0 login/registration functionality
  
2. Workspace Functionality
	- Workspace creation
	- Workspace un/registration
	- Slack-like styling
	- __BONUS:__ Channel/User search

3. Channel Functionality 
	- Channel creation
	- Channel un/subscription
	- Slack-like styling
	- Typing/presence indicators
	- __BONUS:__ Auto-completing user mentions
	- __BONUS:__ Lazy Channels: as opposed to loading the full history of a given channel/thread, only load some of it, loading the rest on demand (ie, user scrolling)

4. Live Chat
	- Websocket functionality for client communication, with client storage of last known event_ts
	- Eventual consistency model around messages (see [Atomic Broadcast notes](#atomic-broadcast-notes)).
	- [Real-time Messaging Server](#architectural-design)
	- Client side pub/sub: client subscribes to list of users/channels that they are 'interested in', and only receive real-time notifications from those. this reduces the amount of events clients have to handle. examples include: presence updates

5. Direct Messages (p2p, p2group)
	- Users can dm anyone in the same workspace
	- Users can enter/leave dms

6. __BONUS:__ Authorization Functionality (workspace, channel)
	- Workspace creators are workspace admin
	- Workspace admin may set permissions of other workspace users
	- Workspace users w/ clearance (ie. channel admins) may create channels
	- Channel admins may boot/mute channel users

7. __BONUS:__ Asynchronous Job Queue 
	- A central server which collects jobs in a queue and dispatches them to its collection of workers, on a first-available basis. The server returns the worker's results to the original caller.
	- Use cases:
		- Async URL unfurling for links shared in chat
		- User mention notifications

### <u>Architectural Design:</u>

**React (on Rails) Client** - connects to:
1. WebApp (Rails Main API)
2. Messaging Server (Rails Messaging API)

**Messaging Server** - connects to:
1. WebApp

**WebApp** - controls
1. PostgreSQL database
2. __BONUS:__ Job Queue for async actions

This isn't much more than an attempt to clone Slack's architecture as presented in reference [[1]](https://www.infoq.com/presentations/slack-scalability/), minute 2:10. 

**React Client**: Responsible for rendering all views for the client. Speaks HTTP with WebApp (thru React), websocket with Messaging Server

**WebApp**: Responsible for implementing all business logic. It keeps records in a PostgreSQL database, and uses a job queue system to execute async jobs.

**Messaging Server**: Uses the WebSocket protocol (ActionCable in our case) to send real-time messages to users. Specifically, it listens for events that happen in the WebApp/db, and then fans those events out to the relevant users

### <u>Atomic Broadcast Notes:</u>
- If a valid user broadcasts a message to the channel, all valid users will eventually receive it
- If a valid user receives a message, all valid users eventually receive it
- Uniform integrity of messages: a message is received at most once by each valid users, if it was broadcast
- Uniform order of messages: all valid users receive all messages in the same order

Strictly satisfying all of these requirements seems to be impossible (see [[2]](https://softwareengineeringdaily.com/wp-content/uploads/2018/11/SED722-Slack-Architecture-2.0.pdf)). For more detail please consult [[3]](https://en.wikipedia.org/wiki/Atomic_broadcast). 

### <u>References:</u>
- [1] [Bing Wei's (on Slack's Infrastructure Team) presentation on Slack's scalability considerations](https://www.infoq.com/presentations/slack-scalability/)
- [2] [Keith Adam's (Slack's Chief Architect) podcast on Slack's messaging architecture](https://softwareengineeringdaily.com/wp-content/uploads/2018/11/SED722-Slack-Architecture-2.0.pdf)
- [3] [Wikipedia Atomic Broadcast](https://en.wikipedia.org/wiki/Atomic_broadcast)