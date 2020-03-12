json.history do
  json.channel_id @channel.id
  json.messages do
    json.array! @messages do |message|
      json.partial! "api/messages/message", message: message
    end
  end
end
json.users do
  json.array! @users do |user|
    json.partial! "api/users/user", user: user
  end
end