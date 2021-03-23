const AbstractContainer = require('./AbstractContainer');
const AbstractResource = require('./Resource/AbstractResource');

class Container extends AbstractContainer {
    /**
     *
     * @param {Object<String, AbstractResource>} resources
     */
    constructor(resources) {
        super();
        this.resources = resources;
    }


    get(name, container= null) {
        if (name === 'context')
            return container || this;
        if (!this.has(name, container )) {
            throw new Error('Resource not found!');
        }
        return this.resources[name].resolve(container || this);
    }

    has(name, container= null) {
        return name === 'context' || this.resource_names().includes(name);
    }

    resource_names() {
        return Object.keys(this.resources);
    }
}

module.exports = Container;