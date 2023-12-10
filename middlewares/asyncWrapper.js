export default (asyncFn) => {
    return function (req, res, next) {
        asyncFn(req, res, next).catch((error) => {
            next(error);
        });
    }
}
