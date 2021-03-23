const AbstractFactory = require('./AbstractFactory');

let instances = new WeakMap();

class SingletonFactory extends AbstractFactory {

    constructor(context, service_factory) {
        super();
        this.service_factory = service_factory;
        this.context = context;
    }

    /**
     * @return {{}}
     */
    get context_scope() {
        if (!instances.get(this.context)) {
            instances.set(this.context, {})
        }
        return instances.get(this.context);
    }

    create() {
        let class_or_factory = arguments[0];
        if (!this.context_scope[class_or_factory]) {
            this.context_scope[class_or_factory] = this.service_factory.create(...arguments);
        }
        return this.context_scope[class_or_factory]
    }

}

module.exports = SingletonFactory;