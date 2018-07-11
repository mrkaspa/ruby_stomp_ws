require "sinatra"
require "json"
require_relative "lib/amqp"

get "/" do
  send_file "templates/index.html"
end

get "/main.js" do
  send_file "templates/main.js"
end

get "/publish.json" do
  AMQP.publish
  content_type :json
  {response: :ok}.to_json
end
