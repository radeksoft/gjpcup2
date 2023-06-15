export const confirm = () => {
    return new Promise((resolve, reject) => {
        process.stdin.once('data', data => {
            const letterCode = data[0];
            if (letterCode === 121)
                resolve(true);
            else
                resolve(false);
        });
    });
};
