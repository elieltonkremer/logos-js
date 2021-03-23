class AbstractMiddleware {

    static singleton = false;

    constructor(context) {
        this.context = context;
    }

    /**
     * @abstract
     */
    initialize() {
        throw new Error('Please implement it!');
    }

    /**
     * @abstract
     */
    finalize() {
        throw new Error('Please implement it!');
    }

}
module.exports = AbstractMiddleware;
