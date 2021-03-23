const AbstractContainer = require('./AbstractContainer');


class StackContainer extends AbstractContainer {

    /**
     * @param {Array<AbstractContainer>} containers
     */
    constructor(containers) {
        super();
        this.containers = containers;
    }

    get(name, container= null) {
        const self = this;
        const resource_container = this.containers.find(function(resource_container) {
            return resource_container.has(name, container || self);
        });
        if (resource_container === undefined) {
            throw new Error(`Resource "${name} not found!`);
        }

        return resource_container.get(name, container || this);
    }

    has(name, container= null) {
        const self = this;
        return this.containers.find(function (_container) {
            return _container.has(name, container);
        }) !== undefined;
    }

    resource_names() {
        let names = [];
        for (const container of this.containers) {
            for (const name of container.resource_names()) {
                if (!names.includes(names)) {
                    names.push(name);
                }
            }
        }
        return names;
    }
}

module.exports = StackContainer;