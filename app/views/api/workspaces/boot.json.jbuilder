json.ok "true"
json.self do
  json.extract! @current_user, :id, :email, :joined_channel_ids
end
json.team do
  json.partial! 'api/workspaces/workspace', workspace: @workspace
  json.default_channel @current_user.joined_channel_ids.first
end
json.channels do
  json.array! @workspace.channels do |channel|
    json.partial! 'api/channels/channel', channel: channel
  end
end