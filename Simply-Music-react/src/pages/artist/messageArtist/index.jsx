import React, { useState } from "react";
import { useParams } from "react-router-dom";

const MessageForm = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    message_content: "",
    sent_hour: "",
    content_artist_id: id,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/users/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: formData }),
      });

      if (response.ok) {
        console.log("enviado con exito")
      } else {
        console.log("hubo un problema")
      }
    } catch (error) {
      console.error("Error submitting message:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="message_content">Message Content:</label>
      <input
        type="text"
        id="message_content"
        name="message_content"
        value={formData.message_content}
        onChange={handleChange}
      />

      <label htmlFor="sent_hour">Sent Hour:</label>
      <input
        type="text"
        id="sent_hour"
        name="sent_hour"
        value={formData.sent_hour}
        onChange={handleChange}
      />

      <input
        type="hidden"
        name="content_artist_id"
        value={formData.content_artist_id}
      />

      <button type="submit">Submit</button>
    </form>
  );
};

export default MessageForm;
