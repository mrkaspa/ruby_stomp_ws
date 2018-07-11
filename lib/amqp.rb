require "bunny"

module AMQP
  extend self

  def publish
    connection = Bunny.new
    connection.start
    channel = connection.create_channel
    queue = channel.queue("demo", durable: true)
    channel.default_exchange.publish("Hello World!", routing_key: queue.name)
    puts " [x] Sent 'Hello World!'"
    connection.close
  end
end
