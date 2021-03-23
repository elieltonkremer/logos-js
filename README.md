# logos-js


Framework de injeção de dependencia utilizado nos meus projetos

Para utiliza-lo é necessário instanciar um 'ApplicationContext' no script principal

```js
const { ApplicationContext } = require("logos");

let application = new ApplicationContext([
  "logos/Command" // demais modulos
])
```

Para criar um modulo siga o exemplo do arquivo './Command/index.js'.


```js

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
            '%context%',// injetando o contexto no o serviço foi requisitado
            '%app.groups.command%'// injetando lista com os comandos registrados na aplicação
        ])
    })
}
```
