const ParameterResource = require('../Context/Resource/ParameterResource');
const GroupResource = require('../Context/Resource/GroupResource');
const ServiceResource = require('../Context/Resource/ServiceResource');
const Container = require('../Context/Container');

const { ArgumentParser } = require('argparse');

module.exports = {
    container: new Container({
        'app.argument_parser': new ParameterResource(new ArgumentParser()),
        'app.groups.command': new GroupResource(/^app.command./),
        'app.command': new ServiceResource('logos/Command/DelegateCommand', [
            '%app.argument_parser%',
            '%context%',
            '%app.groups.command%'
        ])
    })
}