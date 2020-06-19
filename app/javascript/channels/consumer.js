// Action Cable provides the framework to deal with WebSockets in Rails.
// You can generate new channels where WebSocket features live using the `rails generate channel` command.

let consumer;

try {
  //don't bother loading if we're just going to error out
  window === undefined;
  const { createConsumer } = require("@rails/actioncable");
  consumer = createConsumer();
} catch (error) {
  // we're server side, no need to do anything
}

export default consumer;
