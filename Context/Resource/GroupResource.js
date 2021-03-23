const AbstractResource = require('./AbstractResource');
const AbstractContainer = require("../AbstractContainer");


class GroupResource extends AbstractResource {

    /**
     * @param {RegExp} pattern
     */
    constructor(pattern) {
        super();
        this.pattern = pattern;
    }


    resolve(container) {
        const self = this;
        return container.resource_names().filter(function(item) {
            return item.match(self.pattern);
        }).map(function(item) {
            return item.replace(self.pattern, '');
        })
    }
}

module.exports = GroupResource;