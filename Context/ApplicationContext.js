const AbstractContext = require('./AbstractContext');
const Container = require('./Container');
const AbstractContainer = require('./AbstractContainer');
const ParameterResource = require('./Resource/ParameterResource');
const ServiceResource = require('./Resource/ServiceResource');
const StackContainer = require("./StackContainer");
const {dirname, join} = require('path');


class ApplicationContext extends AbstractContext {

    /**
     * @param {Array<String>} modules
     */
    constructor(modules) {
        super(null);
        this._modules = modules;
    }

    /**
     * @param {Array<String>} required
     * @private
     */
    _verify_dependencies(required) {
        const self = this;
        let invalid_dependencies = required.filter(function(dependency) {
            return !self._modules.includes(dependency);
        })
        if (invalid_dependencies.length !== 0) {
            throw new Error(`Modules ${invalid_dependencies.map(JSON.stringify).join(',')} required!`);
        }
    }

    get container() {
        if (this._container === null) {
            let root_dir = dirname(require.main.filename);
            let containers = [];
            containers.push(new Container({
                'app.configuration.modules': new ParameterResource(this._modules),
                'app.configuration.root_dir': new ParameterResource(root_dir),
                'app.context.service_factory': new ServiceResource('logos/Context/Factory/ServiceFactory', ['%context%']),
                'app.context.singleton_factory': new ServiceResource('logos/Context/Factory/SingletonFactory', ['%context%', '%app.context.service_factory%']),
            }))
            let stack = new StackContainer(containers);
            for (const module_path of this._modules) {
                let module = require.main.require(module_path.startsWith('.') ? join(root_dir, module_path) : module_path);
                if (module.dependencies) {
                    this._verify_dependencies(module.dependencies);
                }
                if (module.container) {
                    if (module.container instanceof Function) {
                        containers.push(module.container(stack));
                    } else {
                        containers.push(module.container);
                    }
                }

            }
            containers.reverse();
            this._container = stack;
        }
        return this._container;
    }

}

module.exports = ApplicationContext;