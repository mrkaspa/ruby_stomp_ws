window.onload = function() {
  let client = Stomp.client("ws://localhost:15674/ws")

  client.debug = onDebug

  // Make sure the user has limited access rights
  client.connect(
    "guest",
    "guest",
    onConnect(client),
    onError,
    "/"
  )

  document.getElementById("send").onclick = function(ev) {
    sendMsg(client, "HOLA")
  }
}

function onConnect(client) {
  return function() {
    console.log("subscribing...")

    client.subscribe("/queue/demo", function(d) {
      console.log("STOMP ARRIVED by queueu", d)
      let node = document.createTextNode(d.body + "\n")
      document.getElementById("content").appendChild(node)
    })
  }
}

//Send a message to the chat queue
function sendMsg(client, msg) {
  client.send("/exchange/demo", { "content-type": "text/plain" }, msg)
}

function onError(e) {
  console.log("STOMP ERROR", e)
}

function onDebug(m) {
  console.log("STOMP DEBUG", m)
}
