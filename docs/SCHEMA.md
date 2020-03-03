## users

<b> column name | data type | details </b>
:--|:-:|--:
`id` | integer | not null, primary key
`name` | string | not null
`display name` | string | not null
`email` | string | not null, unique (indexed)
`auth_token` | string | not null
`session_token` | string | not null, unique (indexed)
`avatar_url` | string |
`created_at` | datetime | not null
`updated_at` | datetime | not null

	has_many :sessions
	has_many :memberships, dependent: :destroy
	has_many :messages
	has_many :teams, through: memberships,
		source: :membershipable, source_type: :workspace
	has_many :channels, through: memberships
		source: :membershipable, source_type: :channel
	has_many :threads, through: memberships
		source: :membershipable, source_type: :message

## sessions

<b> column name | data type | details </b>
:--|:-:|--:
`id` | integer | not null, primary key
`user_id` | integer | not null, foreign key, indexed
`session_token` | string | not null, indexed
`created_at` | datetime | not null
`updated_at` | datetime | not null

	belongs_to :user

## workspaces

<b> column name | data type | details </b>
:--|:-:|--:
`id` | integer | not null, primary key
`name` | string | not null, unique (indexed)
`owner_id` | integer | not null, foreign key
`created_at` | datetime | not null
`updated_at` | datetime | not null

	has_many :channels
	has_many :memberships, as: :membershipable
	has_many :users, through: :memberships, source: :user
	belongs_to :user, as: owner

## channels

<b> column name | data type | details </b>
:--|:-:|--:
`id` | integer | not null, primary key
`name` | string | not null, unique* (indexed)
`workspace_id` | string | not null, foreign key, indexed
`type` | string | not null, (public/private/direct)
`created_at` | datetime | not null
`updated_at` | datetime | not null
*Unique only in workspace.

	has_many :memberships, as: :membershipable
	has_many :users, through: :memberships, source: :user
	has_many :messages
	belongs_to :workspace

## messages

<b> column name | data type | details </b>
:--|:-:|--:
`id` | integer | not null, primary key
`body` | text | not null, primary key
`author_id` | integer | not null, unique (indexed), foreign key
`channel_id` | integer | not null, unique (indexed), foreign key
`parent_message_id` | integer | not null*, foreign key
`created_at` | datetime | not null
`updated_at` | datetime | not null
*By default `parent_message_id` will be set to `id`

	has_many :memberships, as: :membershipable
	has_many :users, through: :memberships, source: :user
	belongs_to :user, as: :author
	belongs_to :channel
	has_many :replies, -> { where.not.(parent_message_id: self.id) }, class_name: :Message, foreign_key: :parent_message_id

## memberships

<b> column name | data type | details </b>
:--|:-:|--:
`id` | integer | not null, primary key
`user_id` | integer | not null, foreign key, indexed
`membershipable_id` | integer | not null, foreign key
`membershipable_type` | string | not null, foreign key
`created_at` | datetime | not null
`updated_at` | datetime | not null

`users` can be members of `workspaces`, and `channels`, and `messages`

	add_index :memberships, [::membershipable_type, :membershipable_id]
	add_index :memberships, [:user_id, :membershipable_type, :membershipable_id], unique: true
	belongs_to :membershipable, polymorphic: true
	belongs_to :user

## roles

<b> column name | data type | details </b>
:--|:-:|--:
`id` | integer | not null, primary key
`role` | string | not null, in (user/workspace_admin/channel_admin)
`created_at` | datetime | not null
`updated_at` | datetime | not null

	has_many :memberships, as: :membershipable
	has_many :users, through: :memberships, source: :user
