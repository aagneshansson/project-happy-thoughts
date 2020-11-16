import React, { useState } from 'react';
import './HappyForm.css';

const MESSAGE_URL = "https://happy-thoughts-technigo.herokuapp.com/thoughts";

export const HappyForm = props => {
    const [message, setMessage] = useState('')

    const handleSubmit = event => {
        event.preventDefault();

        // Sending a POST request with the message state 
        fetch(MESSAGE_URL,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message }),
            }
            ).then(() => {
                setMessage('')
                window.location.reload();
            })
                .catch(err => console.error)
        }

        return (
            <form className='happy-form'>
                <h3>Post a happy thought!</h3>
                <textarea
                    rows='3'
                    value={message}
                    onChange={event => setMessage(event.target.value)}
                >
                </textarea>

                <div className="form-footer">
                    <button
                        type='submit'
                        onClick={handleSubmit}
                        disabled={message.lenght < 6 || message.lenght > 140 ? true : false}
                    >
                        <span role="img" aria-label="Red heart"> &#10084;&#65039;
                        </span>
                            Send a happy thought!
                    </button>
                        <p className="text-validation">
                        <span style={{ color: message.length < 6 || message.length > 140 ? "red" : "#000" }}>
                            {message.length}
                        </span>
                        / 140
                        </p>
                </div>
            </form>
    );
};
