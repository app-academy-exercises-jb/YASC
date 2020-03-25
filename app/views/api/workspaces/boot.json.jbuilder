json.ok "true"
json.self do
  json.extract! @current_user, :id, :email
  json.joined_channels do
    json.array! @current_user.joined_channel_ids_by_workspace
  end
end
json.team do
  json.partial! 'api/workspaces/workspace', workspace: @workspace
  json.default_channel @current_user.joined_channel_ids_by_workspace[@workspace.id].first
end
json.channels do
  json.array! @workspace.channels do |channel|
    json.partial! 'api/channels/channel', channel: channel
  end
end