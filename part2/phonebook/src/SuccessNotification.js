export const SuccessNotification = ({message, messageColor}) => {

    if (message === null) {
        return null;
    }
    return (
        <div className='success' style={{color: messageColor}}>
            <p style={{color: messageColor}}>{message}</p>
        </div>
    )
}