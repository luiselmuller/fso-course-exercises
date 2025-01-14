/* eslint-disable react/prop-types */

const Notification = ({ message }) => {
    let messageStyle = {
        backgroundColor: 'gray',
        border:'2px solid green',
        padding: '10px',
        borderRadius: '2px',
        fontSize: '1.4rem',
        width: '100%',
        color: 'green'
    }

    return (
        <div style={message ? messageStyle : {}}>
            <p className="alert">{message}</p>
        </div>
    )
}

export default Notification
