
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

export const getCurrentUTCTimeStamp = () => {
    const now = new Date;
    return Date.UTC(now.getUTCFullYear(),now.getUTCMonth(), now.getUTCDate() , 
        now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds());
}