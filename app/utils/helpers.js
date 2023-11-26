export const isValidField = (obj) => {
    return Object.values(obj).every(value => value.trim().length > 0);
}

export const updateError = (error, stateUpdater) => {
    stateUpdater(error);
    setTimeout(() => {
        stateUpdater('');
    }, 3000);
    return false;
}

export const isValidEmail = (email) => {
    const regEx = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    return regEx.test(email);
}