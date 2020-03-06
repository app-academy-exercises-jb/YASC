json.ok "true"
json.self do
  json.extract! user, :id, :email
end
json.team do
  json.extract! workspace, :id, :name  
end