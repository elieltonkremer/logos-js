/**
 * @abstract
 * @template T
 */
class AbstractFactory {

    static singleton = false;

    /**
     * @abstract
     * @return {T}
     */
    create() {
        throw new Error('Please implement it!');
    }
}

module.exports = AbstractFactory;