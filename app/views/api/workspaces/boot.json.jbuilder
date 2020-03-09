json.ok "true"
json.self do
  json.extract! @current_user, :id, :email
end
json.team do
  json.partial! 'api/workspaces/workspace', workspace: @workspace
end
json.channels do
  json.array! @workspace.channels do |channel|
    json.partial! 'api/channels/channel', channel: channel
  end
end