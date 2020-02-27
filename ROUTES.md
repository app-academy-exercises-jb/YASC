## Frontend Routes

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
		* AuxContent
			* Thread
			* UserProfile
		* UserProfileSnippet
		* Modal
			* AddChannel
			* AddDM
			* Preferences
			* Search

## Backend Routes