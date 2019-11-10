document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.querySelector('#form-signup')
    signupForm.addEventListener('submit', submitSignupForm)

})

const submitSignupForm = () => {
    event.preventDefault()
    const usernameInput = document.querySelector('#username').value
    const passwordInput = document.querySelector('#password').value
    const firstNameInput = document.querySelector('#first-name').value
    const lastNameInput = document.querySelector('#last-name').value

    accountCreationHandler(usernameInput, passwordInput, firstNameInput, lastNameInput)

}

const checkForValidInputs = () => {
    const usernameInput = document.querySelector('#username').value
    const passwordInput = document.querySelector('#password').value
    const firstNameInput = document.querySelector('#first-name').value
    const lastNameInput = document.querySelector('#last-name').value

    if (usernameInput !== '' && passwordInput !== '' && firstNameInput !== '' && lastNameInput !== ''){
        return true
    } else {
        return false
    }
}

const accountCreationHandler = async (username, password, firstname, lastname) => {
    const routeInfo = await axios.get(`http://localhost:8000/users/${username}`)
    const user = routeInfo.data.payload
    
    if (user === undefined && checkForValidInputs() === true){
        console.log('all good homie')
        const postInputValues = await axios.post(`http://localhost:8000/users`,{username, password, firstname, lastname})
        console.log(postInputValues)
    } else if(user === undefined || checkForValidInputs() === false){
        console.log('Remember to fill out all fields')
        window.alert('Remember to fill out all fields')
    } else {
        console.log('Username already taken. Please choose another')
        window.alert('Username already taken. Please choose another')
    }  
    
}



