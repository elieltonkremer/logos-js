const AbstractContainer = require('../AbstractContainer');

/**
 * @abstract
 */
class AbstractResource {

    /**
     * @abstract
     * @param {AbstractContainer} container
     */
    resolve(container) {
        throw new Error('Please implement it!');
    }
}

module.exports = AbstractResource;