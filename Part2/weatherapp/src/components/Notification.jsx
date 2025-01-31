const Notification = message => {
    const messageStyle = {
        color: 'green',
        background: 'lightgray',
        fontSize: 25,
        fonstStyle: 'italic',
        borderStyle: 'solid',
        padding: 30,
        marginBottom: 10
    }
    if(message === null)
        return null
    
    return (
        <div style={messageStyle}>
            {message}
        </div>
    )
}

export default Notification