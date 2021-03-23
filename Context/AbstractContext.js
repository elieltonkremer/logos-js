const AbstractContainer = require('./AbstractContainer');

/**
 * non singleton container implementation
 *@abstract
 */
class AbstractContext extends AbstractContainer {

    static singleton = false;

    /**
     * @param {AbstractContainer} container
     */
    constructor(container = null) {
        super();
        this._container = container;
    }

    /**
     * @return {AbstractContainer}
     */
    get container() {
        return this._container;
    }

    /**
     * @param {AbstractContainer} container
     */
    set container(container) {
        this._container = container;
    }

    get(name, container) {
        return this.container.get(name, container || this);
    }

    has(name, container) {
        return this.container.has(name, container || this);
    }

    resource_names() {
        return this.container.resource_names();
    }

    /**
     * @param {Array<String>} middleware
     * @param { Function } callback
     * @param {boolean} async
     * @return {*}
     */
    with(middleware, callback) {
        if (callback.constructor.name === "AsyncFunction") {
            return this._asynchornous_with(middleware, callback);
        } else {
            return this._synchornous_with(middleware, callback);
        }
    }

    _synchornous_with(middleware, callback) {
        const self = this;
        middleware = middleware || [];

        let services = middleware.map(function (name) {
            let service = self.get(name);
            service.initialize()
            return service;
        })
        let result = null;
        try {
            result = callback(this);
        } finally {
            services.reverse()
            for (let service of services) {
                service.finalize();
            }
        }



        return result;
    }

    async _asynchornous_with(middleware, callback) {
        const self = this;
        middleware = middleware || [];

        let services = middleware.map(function (name) {
            return self.get(name);
        })

        for (let service of services) {
            await service.initialize();
        }
        let result = null;
        try {
            result = await callback(this);
        } finally {
            services.reverse()
            for (let service of services) {
                await service.finalize();
            }
        }

        return result;
    }

}


module.exports = AbstractContext;