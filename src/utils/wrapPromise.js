// utils/wrapPromise.js

const wrapPromise = (promise) => {
    let status = 'pending';
    let result;

    const suspender = promise.then(
        (res) => {
            status = 'success';
            result = res;
        },
        (err) => {
            status = 'error';
            result = err;
        }
    );

    return {
        read() {
            if (status === 'pending') {
                throw suspender;
            } else if (status === 'error') {
                throw result;
            } else {
                return result;
            }
        }
    };
};

export default wrapPromise;