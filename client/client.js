// appends response data to the page
const handleResponse = async (response, parseResponse, getUsers) => {
    // grabs the content section
    const content = document.querySelector("#content");

    // Changes header based on status code
    switch (response.status) {
        case 200:
            content.innerHTML = `<b>Success</b>`;
            break;
        case 201:
            content.innerHTML = `<b>Created</b>`;
            break;
        case 204:
            content.innerHTML = `<b>Updated (No Content)</b>`;
            break;
        case 400:
            content.innerHTML = `<b>Bad Request</b>`;
            break;
        case 404:
            content.innerHTML = `<b>Not Found</b>`;
            break;
        default:
            content.innerHTML = `<b>Status Code Not Implemented By Client</b>`;
            break;
    }

    // head requests don't send back information,
    // so will say data recieved
    if (parseResponse) {
        if (getUsers) {
            let obj = await response.json();
            let jsonString = JSON.stringify(obj);
            content.innerHTML += `<p>${jsonString}</p>`;
        } else {
            let obj = await response.json();
            content.innerHTML += `<p>Message: ${obj.message}</p>`;
        }
    }
}

// sends post requests
const sendPost = async (nameForm) => {
    const nameAction = nameForm.getAttribute('action');
    const nameMethod = nameForm.getAttribute('method');
    const nameField = nameForm.querySelector('#nameField');
    const ageField = nameForm.querySelector('#ageField');

    const formData = `name=${nameField.value}&age=${ageField.value}`;

    // makes a fetch request
    let response = await fetch(nameAction, {
        method: nameMethod,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',
        },
        body: formData,
    });

    // handles the response
    handleResponse(response, response.status !== 204, false);

}

// sends request
const requestUpdate = async (userForm) => {
    const url = userForm.querySelector('#urlField').value;
    const method = userForm.querySelector('#methodSelect').value;

    // makes the fetch request
    let response = await fetch(url, {
        method: method,
        headers: {
            'Accept': 'application/json'
        },
    });

    // calls handleResponse when we get a response
    // send true for method only on head requests
    handleResponse(response, method === 'get', url === '/getUsers');
}
// grab the two forms
const addUserForm = document.querySelector("#nameForm");
const getUserForm = document.querySelector("#userForm");

const addUser = (e) => {
    e.preventDefault();
    sendPost(addUserForm);
    return false;
}

const getUsers = (e) => {
    e.preventDefault();
    requestUpdate(getUserForm);
    return false;
}

// add the callbacks to the two forms
addUserForm.addEventListener('submit', addUser);
getUserForm.addEventListener('submit', getUsers);