const success = {
    color: 'green'
}
const fail = {
    color: 'red'
}

function newContactAdded(name){
    const message = <h2 style={success} id='message'>Added {name}</h2>
    return message
}

function contactNumberUpdated(name){
    const message = <h3 style={success}>{name}'s number has been updated</h3>
    return message
}

function contactDeletedSuccess(name){
    const message = <h3 style={success}>{name} has been deleted</h3>
    return message
}

function contactDeleteFail(name){
    const message = <h3 style={fail}>{name} has been deleted</h3>
    return message

}

function removeNotification(setNotification){
    return setTimeout(()=>{
        setNotification(false)
    },3000)
}

export default {newContactAdded, contactNumberUpdated,contactDeletedSuccess,contactDeleteFail, removeNotification}