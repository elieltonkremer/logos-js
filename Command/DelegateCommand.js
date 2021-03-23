const AbstractCommand = require("./AbstractCommand");

class DelegateCommand extends AbstractCommand {

    /**
     * @param argument_parser
     * @param context
     * @param { Array<String> }groups
     */
    constructor(argument_parser, context, groups) {
        super(argument_parser, context);
        this.groups = groups;
    }

    define_arguments(argument_parser) {
        argument_parser.add_argument('command', {
            'help': "type a command to execute",
            "choices": this.groups
        });
    }

    execute() {
        let command = this.context.get(`app.command.${this.argument.command}`);
        return command.execute();
    }
}

module.exports = DelegateCommand;