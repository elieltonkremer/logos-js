const AbstractResource = require('./AbstractResource');
const ParameterResource = require("./ParameterResource");
const {join} = require('path');

class ServiceResource extends AbstractResource {

    /**
     * @param {String} class_or_factory
     * @param {Array} parameters
     */
    constructor(class_or_factory, parameters = null) {
        super();
        this.class_or_factory = class_or_factory;
        this.parameters = parameters || [];
    }

    /**
     * @param {String} import_path
     * @param {AbstractContainer} container
     */
    static resolve_import(import_path, container) {
        let root_dir = container.get('app.configuration.root_dir');
        let paths = import_path.split('::');
        let item = require.main.require(paths[0].startsWith('.') ? join(root_dir, paths[0]) : paths[0]);
        for (let index = 0; index < paths.length; index++) {
            if (index === 0)
                continue;
            item = item[paths[index]];
        }
        return item;
    }

    resolve(container) {
        let class_or_factory = ParameterResource.resolve_parameter(this.class_or_factory, container);
        if (typeof class_or_factory === "string") {
            class_or_factory = {
                class_path: class_or_factory,
                create: function() {
                    let Class = ServiceResource.resolve_import(this.class_path, container);
                    return new Class(...arguments);
                }
            }
        }
        return class_or_factory.create(...ParameterResource.resolve_parameter(this.parameters, container))

    }
}

module.exports = ServiceResource;