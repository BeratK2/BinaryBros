import React, {useState} from 'react'

const ChatInput = () => {
    const [textarea, setTextArea] = useState(null);
    return (
        <div className="chat-input">
            <textarea value={textarea} onChange={(e) => setTextArea(e.target.value)}/>
            <button className="secondary-button">Submit</button>
        </div>
    )
}

export default ChatInput