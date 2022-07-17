const style = {
    color: 'green'
}

function newContactAdded(name){
    const message = <h2 style={style} id='message'>Added {name}</h2>
    return message
}

function contactNumberUpdated(name){
    const message = <h3 style={style}>{name}'s number has been updated</h3>
    return message
}

function removeNotification(setNotification){
    return setTimeout(()=>{
        setNotification(false)
    },5000)
}

export default {newContactAdded, contactNumberUpdated, removeNotification}