/**
 * @abstract
 */
class AbstractContainer {

    /**
     * @abstract
     * @param {string} name
     * @param {AbstractContainer} container
     */
    get(name, container= null) {
        throw new Error('Please implement it!');
    }

    /**
     * @abstract
     * @param {string} name
     * @param {AbstractContainer} container
     * @return {boolean}
     */
    has(name, container = null) {
        throw new Error('Please implement it!');
    }

    /**
     * @abstract
     * @return {Array<string>}
     */
    resource_names() {
        throw  new Error('Please implement it!');
    }
}

module.exports = AbstractContainer;
