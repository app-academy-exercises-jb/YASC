json.array! @user.teams do |workspace|
  json.partial! 'api/workspaces/workspace', workspace: workspace
end
