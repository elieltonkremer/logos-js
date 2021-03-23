const AbstractFactory = require('./AbstractFactory');
const ServiceResource = require('../Resource/ServiceResource');


class ServiceFactory extends AbstractFactory {

    constructor(context) {
        super();
        this.context = context;
    }

    create() {
        let service_resource = new ServiceResource(...arguments);
        return service_resource.resolve(this.context);
    }

}

module.exports = ServiceFactory;