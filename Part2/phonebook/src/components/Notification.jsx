const Notification = ({message, success}) => {
    const successStyle = {
        color: 'green',
        background: 'lightgray',
        fontSize: 24,
        padding: 20,
        borderStyle: 'solid',
        marginBottom: 10
    }

    const failStyle = {
        color: 'red',
        background: 'lightgray',
        fontSize: 24,
        padding: 20,
        borderStyle: 'solid',
        marginBottom: 10
    }
    
    const messageStyle = success? successStyle: failStyle

    if (message === null)
        return null

    return (
        <div style={messageStyle}>
            {message}
        </div>
    )
}

export default Notification