
import { toast } from 'react-toastify';

export const debounce = (func, timeout = 100) => {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
}

export const showSuccessMessage = (msg) => {
    toast.success(msg, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true
    });
}