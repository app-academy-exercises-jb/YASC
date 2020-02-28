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
* `GET api/v1/users` => `Api::V1::UsersController#index`
	* get list of users according to params
* `POST api/v1/users` => `Api::V1::UsersController#create`
	* register new user
* `PUT api/v1/users/:id` => `Api::V1::UsersController#update`
	* update user info
* `DELETE api/v1/users/:id` => `Api::V1::UsersController#delete`
	* delete user

### Session
* `POST api/v1/session` => `Api::V1::SessionsController#create`
	* login
* `DELETE api/v1/session` => `Api::V1::SessionsController#delete`
	* logout

### Workspaces
* `GET api/v1/workspaces/:id` => `Api::V1::WorkspacesController#show`
	* get current snapshot of workspace. first route the client hits when bootstrapping
* `GET api/v1/users/:id/workspaces` => `Api::V1::WorkspacesController#index`
	* get all of a user's workspaces
* `POST api/v1/workspaces` => `Api::V1::WorkspacesController#create`
	* create new workspace
* `DELETE api/v1/workspaces/:id` => `Api::V1::WorkspacesController#delete`
	* delete a workspace

### Channels
* `GET api/v1/channels` => `Api::V1::ChannelsController#index`
	* get list of channels in workspace
* `GET api/v1/channels/:id` => `Api::V1::ChannelsController#show`
	* get specific channel info
* `POST api/v1/channels` => `Api::V1::ChannelsController#create`
	* create new channel
* `PUT api/v1/channels/:id` => `Api::V1::ChannelsController#update`
	* update a channel -- eg, a new user joins it
* `DELETE api/v1/channels/:id` => `Api::V1::ChannelsController#delete`
	* delete a channel

### Messages
* `POST api/v1/messages` => `Api::V1::MessagesController#index`
	* create new message
* `PUT api/v1/messages/:id` => `Api::V1::MessagesController#update`
	* edit a message
* `DELETE api/v1/channels/:id` => `Api::V1::MessagesController#delete`
	* delete a message

### Memberships
* `POST api/v1/workspaces/:id/memberships` => `Api::V1::MembershipsController#create`
	* make a user a member of a workspace
* `DELETE api/v1/workspaces/:id/memberships` => `Api::V1::MembershipsController#delete`
	* delete a user from a workspace
* `POST api/v1/channels/:id/memberships` => `Api::V1::MembershipsController#create`
	* make a user a member of a channel
* `DELETE api/v1/channels/:id/memberships` => `Api::V1::MembershipsController#delete`
	* delete a user from a channel