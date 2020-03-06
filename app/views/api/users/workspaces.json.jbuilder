json.array! @user.workspaces do |workspace|
  json.partial! 'api/workspaces/workspace', workspace: workspace
end
