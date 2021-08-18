function validateName(name) {
    if(!/^[a-zA-Z]+$/.test(name))
        return [1, "Cannot contain numbers or symbols"];
    else
        return [2];
}

function validateEmail(email) {
    if(!/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(email))
        return [1, "Email pattern incorrect"];
    // else if(email exists)
    //     return [1, "Email already exists"];
    else
        return [2]
}

function validatePassword(password) {
    if(!/(?=.*[a-z]+)(?=.*[A-Z]+)(?=.*[0-9]+)/.test(password))
        return [1, "Password must contain letters, capital letters and numbers"]
    else
        return [2];

}

export function validation(type, value) {
    if(value==="")
        return [0];

    switch(type) {
        case "FirstName":
        case "LastName":
            return validateName(value);
        case "Email": return validateEmail(value);
        case "Password": return validatePassword(value);
        default: return;
    }
}