import React from 'react'
import "../messages/style.css"

function Messages({messages}) {
  return (
    <div className="messagesArtist">
    <h2>Weekly message of the artist:</h2>
    {messages.length > 0 ? (
      <>
        {messages.map((message) => (
          <div key={message.id}>
            {message.message_content} - {message.sent_hour}
          </div>
        ))}
      </>
    ) : (
      <p>No messages</p>
    )}
  </div>
  )
}

export default Messages