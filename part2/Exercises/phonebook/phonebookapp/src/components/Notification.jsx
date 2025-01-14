/* eslint-disable react/prop-types */

const Notification = ({ message, type }) => {
    if (!message) {
        return null
    }
    
    let msgStyleSuccess = {
        backgroundColor: 'gray',
        border:'2px solid green',
        padding: '10px',
        borderRadius: '2px',
        fontSize: '1.4rem',
        width: '100%',
        color: 'green'
    }

    let msgStyleError = {
        backgroundColor: 'gray',
        border:'2px solid red',
        padding: '10px',
        borderRadius: '2px',
        fontSize: '1.4rem',
        width: '100%',
        color: 'red'
    }

    const style = type === 'success' ? msgStyleSuccess : msgStyleError

    return (
        <div  style={style}>
            <p>{message}</p>
        </div>
    )
}

export default Notification
