# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

demo = User.create!(email: "demo@example.com", password: "abcd1234")
acme = Workspace.create!(name: "Acme", owner_id: demo.id)

demo.teams << acme

22.times do
  u = User.create!(email: Faker::Internet.email, password: "asdfasdf")
  u.teams << acme
  acme.channels.first.users << u
  acme.channels.second.users << u

  (rand(2)+1).times do
    c = Channel.create(
      name: Faker::Hacker.adjective,
      workspace_id: acme.id,
      channel_type: "public"
    )

    next unless c.valid?

    users = []
    until users.length >= User.last.id / 2
      rand(User.last.id).times do |i|
        users << User.find_by(id: rand(i))
      end
    end
    
    users = users.compact.uniq

    unless users.empty? 
      users.each do |user|
        c.users << user unless c.users.include?(user)
        p "registering #{user.email}"
      end

      (rand(15)+3).times do
        Message.create!(
          author_id: users.sample.id,
          channel_id: c.id,
          body: Faker::Hacker.say_something_smart
        )
      end
    end
  end

  c_id = acme.channels.first.id
  rand(2).times do
    Message.create!(
      author_id: u.id,
      channel_id: c_id,
      body: Faker::Hacker.say_something_smart)
  end
end