import "./App.css"
import io from "socket.io-client"

import { useEffect, useState } from "react"

const this_ip_address = "http://10.73.90.228:3001"
const socket = io.connect(this_ip_address)

function App() {
  const [message, setMessage] = useState("")
  const [signature, setSignature] = useState("")
  const [messageReceived, setMessageReceived] = useState("")
  const [signatureReceived, setSignatureReceived] = useState("")

  const sendMessage = () => {
    const packet_msg = { message: message, signature_sent: signature }
    socket.emit("send_message", { packet_msg })
  }

  const endTheConnection = () => {
    const packet_msg = { message: "[CONNECTION TERMINATED]", signature_sent: signature }
    socket.emit("send_message", { packet_msg })
    socket.disconnect()
  }

  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log("hehe")
      console.log(data)
      setMessageReceived(data.packet_msg.message)
      setSignatureReceived(data.packet_msg.signature_sent)
    })
  }, [socket])

  return (
    <div className="App">
      <title>Zichun Wang's socket project: </title>
      <input
        placeholder="for course CS540"
        onChange={(event) => {
          setMessage(event.target.value + "\n\n                  . This message is sent on:" + new Date() + "." + " Signed by:")
        }}
      />
      <br />

      <input
        placeholder="Enter your signature here"
        onChange={(event) => {
          setSignature(event.target.value)
        }}
      />
      <br />
      <button onClick={sendMessage}>Send Message:</button>
      <button onClick={endTheConnection}>End the Connection</button>
      <h1>Message: </h1>
      {messageReceived}
      <h5>Signature: </h5>
      <br></br>
      {signatureReceived}
      <p>------------------------------------------------------</p>
      <p>For the CS540 course in 2023 Fall. By Zichun Wang(Tom)</p>
      <a href="https://www.youtube.com/watch?v=djMy4QsPWiI">source link here.</a>
    </div>
  )
}

export default App

//socket.disconnect()
