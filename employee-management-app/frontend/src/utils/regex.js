// Email validation (RFC-like, simple practical version)
const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;

// Password validation (uppercase, lowercase, number, special char, min 8)
// const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,100}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d@$!%*?&#^()_\-+=~`{}[\]|\\:;"'<>,.?/]{8,100}$/;

// Indian phone validation: 10 digits, must not start with 0
const phoneRegex = /^[1-9][0-9]{9}$/;

// Indian PIN Code validation (6 digits, cannot start with 0)
const pinCodeRegex = /^[1-9][0-9]{5}$/;

export {
    emailRegex,
    passwordRegex,
    phoneRegex,
    pinCodeRegex
};
