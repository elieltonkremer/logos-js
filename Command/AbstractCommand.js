const {ArgumentParser} = require('argparse');
const AbstractContainer = require('../Context/AbstractContainer');


class AbstractCommand {

    /**
     * @param {ArgumentParser} argument_parser
     * @param {AbstractContainer} context
     */
    constructor(argument_parser, context) {
        this.argument_parser = argument_parser;
        this.context = context;
        this._arguments = null;
    }

    /**
     * @param {ArgumentParser} argument_parser
     */
    define_arguments(argument_parser) {

    }

    /**
     * @return {Object}
     */
    get argument() {
        if (this._arguments == null) {
            this.define_arguments(this.argument_parser);
            this._arguments = this.argument_parser.parse_known_args()[0];
        }
        return this._arguments;
    }

    /**
     * @abstract
     */
    execute() {

    }

}

module.exports = AbstractCommand;