/** */
import React, { useState, useEffect } from 'react';

const Toast = props => {
    const {type, message} = props.data;
    
    const [displayCode, setDisplayCode] = useState();
    const [displayMessage, setDisplayMessage] = useState();

    useEffect(() => {
        setDisplayCode(type);
        setDisplayMessage(message);
    }, [type, message]);

    const toastStyle = {
        success : {
            display: 'block',
            padding: '10px',
            backgroundColor: '#9fec94',
            color: '#333'
        },
        failure : {
            display: 'block',
            padding: '10px',
            backgroundColor: '#ec9696',
            color: '#333'
        },
        progress : {
            display: 'block',
            padding: '10px',
            backgroundColor: '#95cef5',
            color: '#333'
        }, 
        none : {
            display: 'none'
        }
    }

    const resolveStyle = type => {
        switch(type) {
            case 1:
                return toastStyle.success;
            case 2:
                return toastStyle.failure;
            case 3:
                return toastStyle.progress;
            default:
                return toastStyle.none;
        }
    }

    return (<div className='form-message' style={resolveStyle(displayCode)}>
            {displayMessage}
        </div>)
}

export default Toast;