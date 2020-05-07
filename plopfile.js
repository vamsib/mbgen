const fs = require('fs')
const path = require('path');

module.exports = function (plop) {
    plop.setActionType('create_dir', function (answers, config, plop) {
      return new Promise((resolve, reject) => {
        fs.mkdir(`${config.path}/${answers.name}`, {}, err => {
          if (err) {
            reject(err);
          } else {
            resolve(`${config.path}/${answers.name} created`)
          }
        })
      })
    });

    plop.setActionType('create_scenario', function (answers, config, plop) {
      return new Promise((resolve, reject) => {
        fs.mkdir(`${config.path}/${answers.service}/${answers.name}`, {}, err => {
          if (err) {
            reject(err);
          } else {
            resolve(`${config.path}/${answers.service}/${answers.name} created`)
          }
        })
      })
    });


    plop.setActionType('create_stub_dir', function (answers, config, plop) {
      return new Promise((resolve, reject) => {
        fs.mkdir('stubs', {}, err => {
          if (err) {
            reject(err);
          } else {
            resolve(`stubs directory created`)
          }
        })
      })
    });

    plop.setGenerator('init', {
        description: 'Initialize project',
        prompts:[],
        actions: [
          {
              type: 'create_stub_dir',
          },
          {
            type: 'add',
            path: 'stubs/index.ejs',
            templateFile: path.join(__dirname, 'plop-templates', 'stubs_main.hbs')
          },
          {
            type: 'add',
            path: 'stubs/stubs.ejs',
            template: ''
          },
          {
            type: 'add',
            path: 'imposters.ejs',
            templateFile: path.join(__dirname, 'plop-templates', 'main.hbs')
          }
        ]
    });

    plop.setGenerator('service', {
        description: 'Root for all stubs of this microservice',
        prompts: [{
            type: 'input',
            name: 'name',
            message: 'Service name'
        }],
        actions: [
          {
              type: 'create_dir',
              path: 'stubs'
          },
          {
            type: 'add',
            path: 'stubs/{{name}}/index.ejs',
            templateFile: path.join(__dirname, 'plop-templates', 'service_entry.hbs')
          },
          {
            type: 'append',
            path: 'stubs/stubs.ejs',
            template: '<% include {{name}}/index.ejs %>',
            separator: ',\r\n'
          }
        ]
    });

    plop.setGenerator('scenario', {
        description: 'A particular scenario you would like to stub',
        prompts: [
          {
            type: 'list',
            name: 'service',
            message: 'Service name',
            choices: () => {
              const entries = fs.readdirSync("stubs", { withFileTypes: true });
              return entries.filter(entry => entry.isDirectory()).map(entry => entry.name)
            }
          },
          {
            type: 'input',
            name: 'name',
            message: 'Scenario name e.g. market_order_placement_success'
          },
          {
            type: 'input',
            name: 'endpoint',
            message: 'Endpoint',
            default: answers => `/${answers.service}`
          },
          {
            type: 'input',
            name: 'method',
            message: 'HTTP verb',
            default: 'GET'
          },
          {
            type: 'number',
            name: 'responseCode',
            message: 'HTTP response code',
            default: 200
          }
        ],
        actions: [
          {
              type: 'create_scenario',
              path: 'stubs'
          },
          {
            type: 'add',
            path: 'stubs/{{service}}/{{name}}/index.ejs',
            templateFile: path.join(__dirname, 'plop-templates', 'stub.hbs')
          },
          {
            type: 'add',
            path: 'stubs/{{service}}/{{name}}/response.ejs',
            template: '{}'
          },
          {
            type: 'append',
            path: 'stubs/{{service}}/index.ejs',
            template: '<% include {{name}}/index.ejs %>',
            separator: ',\r\n'
          }
        ]
    });
};
