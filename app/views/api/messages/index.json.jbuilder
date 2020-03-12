json.channel_id @channel.id
json.messages do
  json.array! @messages do |message|
    json.partial! "api/messages/message", message: message
  end
end
