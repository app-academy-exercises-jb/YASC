## users

<b> column name | data type | details </b>
:--|:-:|--:
`id` | integer | not null, primary key
`email` | string | not null, unique (indexed)
`auth_token` | string | not null
`session_token` | string | not null, unique (indexed)
`created_at` | datetime | not null
`updated_at` | datetime | not null

	has_one :memberships
	has_many :workspaces, through: memberships
	has_many :channels, through: memberships
	has_many :messages, through: memberships

## workspaces

<b> column name | data type | details </b>
:--|:-:|--:
`id` | integer | not null, primary key
`name` | string | not null, unique (indexed)
`owner_id` | integer | not null, foreign key
`created_at` | datetime | not null
`updated_at` | datetime | not null

	has_many :members, as: :membershipable
	belongs_to :users, as: owner

## channels

<b> column name | data type | details </b>
:--|:-:|--:
`id` | integer | not null, primary key
`name` | string | not null, unique* (indexed)
`owner_id` | integer | not null, foreign key, indexed
`workspace_id` | string | not null, foreign key, indexed
`type` | string | not null, (public|private|direct)
`created_at` | datetime | not null
`updated_at` | datetime | not null
*Unique only in workspace.

	has_many :members, as: :membershipable

## messages

<b> column name | data type | details </b>
:--|:-:|--:
`id` | integer | not null, primary key
`body` | text | not null, primary key
`author_id` | integer | not null, unique (indexed), foreign key
`channel_id` | integer | not null, unique (indexed), foreign key
`created_at` | datetime | not null
`updated_at` | datetime | not null

	has_many :members, as: :membershipable
  belongs_to :users, as: :author

## memberships

<b> column name | data type | details </b>
:--|:-:|--:
`id` | integer | not null, primary key
`user_id` | integer | not null, foreign key, indexed
`membershipable_id` | integer | not null, foreign key, indexed
`membershipable_type` | string | not null, foreign key, indexed
`created_at` | datetime | not null
`updated_at` | datetime | not null
`users` can be members of `workspaces`, `channels`, and `messages`

	belongs_to :membershipable, polymorphic: true
	belongs_to :user