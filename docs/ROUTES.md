# Frontend Routes

The following is a schema for the organization of React components in our frontend. Their respective React Router routes are defined next to them.

* Root `/`
	* HomePage `/`
		* NavBar
		* Main
		* Footer
	* SignupForm `/signup`
	* LoginForm `/login`
	* YASC `/app/<teamId>/<channelId>/<?threadType>/<?threadId>`
		* SideBar
			* Header
				* Dropdown
			* Channels
			* DMs
		* ChannelContent
			* Header
			* Messages
			* MessageEditor
		* AuxContent
			* Thread
			* UserProfile
		* UserProfileSnippet
		* Modal
			* AddChannel
			* AddDM
			* Preferences
			* Search

# Backend Routes

## HTML

* `GET /*` => `ApplicationController#root`

## API

### Users
* `GET api/users/:id` => `Api::UsersController#show`
	* get specific user according to params. similar to slack: `users.info`
* `GET api/users` => `Api::UsersController#index`
	* get list of users according to params. similar to slack: `users.list`
* `POST api/users` => `Api::UsersController#create`
	* register new user
* `PUT api/users/:id` => `Api::UsersController#update`
	* update user info
* `DELETE api/users/:id` => `Api::UsersController#delete`
	* delete user

### Session
* `POST api/session` => `Api::SessionsController#create`
	* login
* `DELETE api/session` => `Api::SessionsController#delete`
	* logout

### Workspaces
* `GET api/workspaces/:id` => `Api::WorkspacesController#show`
	* get current snapshot of workspace. first route the client hits when bootstrapping. similar to slack: `client.boot` or `rtm.start`
* `GET api/workspaces/:id/counts` => `Api::WorkspacesController#show`
	* get current snapshot of workspace-level info for a given user. similar to slack: `client.count`
* `POST api/workspaces` => `Api::WorkspacesController#create`
	* create new workspace
* `DELETE api/workspaces/:id` => `Api::WorkspacesController#delete`
	* delete a workspace

### Channels
* `GET api/workspaces/:id/channels` => `Api::ChannelsController#index`
	* get list of channels in workspace
* `GET api/channels/:id` => `Api::ChannelsController#show`
	* get specific channel state. similar to slack: `channels.info`, or `conversations.view`
* `POST api/channels` => `Api::ChannelsController#create`
	* create new channel
* `PUT api/channels/:id` => `Api::ChannelsController#update`
	* update a channel -- eg, a new user joins it
* `DELETE api/channels/:id` => `Api::ChannelsController#delete`
	* delete a channel

### Messages
* `GET api/channel/:id/messages` => `Api::MessagesController#index`
	* get messages for a given channel. similar to slack: `conversations.history`
* `POST api/messages` => `Api::MessagesController#create`
	* create new message. similar to slack: `chat.postMessage`
* `PUT api/messages/:id` => `Api::MessagesController#update`
	* edit a message. 
* `DELETE api/channels/:id` => `Api::MessagesController#delete`
	* delete a message

### Memberships
* `POST api/workspaces/:id/memberships` => `Api::MembershipsController#create`
	* make a user a member of a workspace
* `DELETE api/workspaces/:id/memberships` => `Api::MembershipsController#delete`
	* delete a user from a workspace
* `POST api/channels/:id/memberships` => `Api::MembershipsController#create`
	* make a user a member of a channel
* `DELETE api/channels/:id/memberships` => `Api::MembershipsController#delete`
	* delete a user from a channel