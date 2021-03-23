const AbstractResource = require('./AbstractResource');
const AbstractContainer = require("../AbstractContainer");

class ParameterResource extends AbstractResource {

    constructor(value) {
        super();
        this.value = value;
    }

    resolve(container) {
        return ParameterResource.resolve_parameter(this.value, container);
    }

    /**
     * @param {*} value
     * @param {AbstractContainer} container
     * @return {*}
     */
    static resolve_parameter(value, container) {
        if (Array.isArray(value)) {
            return value.map(function(item) {
                return ParameterResource.resolve_parameter(item, container);
            });
        }
        if (typeof value === "string") {
            if (value.startsWith('%') && value.endsWith('%')) {
                return ParameterResource.resolve_parameter(container.get(value.substring(1, value.length -1), container), container);
            }
        }
        return value;
    }
}

module.exports = ParameterResource;