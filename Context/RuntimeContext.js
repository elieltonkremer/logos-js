const AbstractContext = require('./AbstractContext');
const AbstractContainer = require('./AbstractContainer');
const StackContainer = require('./StackContainer');

class RuntimeContext extends AbstractContext {

    /**
     * @param {AbstractContainer} container
     * @param {{}} runtime
     */
    constructor(container, runtime = null) {
        super();
        this.container = container;
        this._runtime = runtime || {};
        this._runtime['context'] = this;
        this._resource_names_cache = null;
    }


    get(name, container) {
        if (this._runtime[name] === undefined) {
             let resource = this.container.get(name, container || this);
             if (resource && resource.singleton === false) {
                 return resource;
             } else {
                 this._runtime[name] = resource;

             }
        }
        return this._runtime[name];
    }

    has(name, container) {
        return Object.keys(this._runtime).includes(name) || this.container.has(name, container || this);
    }

    resource_names() {
        if (!this._resource_names_cache) {
            let resources = this.container.resource_names();
            for (const runtime of Object.keys(this._runtime)) {
                resources.push(runtime);
            }
            this._resource_names_cache = resources;
        }

        return this._resource_names_cache;
    }
}

module.exports = RuntimeContext;