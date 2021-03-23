const AbstractContainer = require('./AbstractContainer');

/**
 * non singleton container implementation
 *@abstract
 */
class AbstractContext extends AbstractContainer {

    static singleton = false;

}


module.exports = AbstractContext;