Mountebank is a great tool that allows us to mock services using different protocols. It is extremely stable and simple to use, yet very flexibile. When using in fast moving projects, though, boiler-plate code and organizing stubs can get unmanageable. Mbgen is an attempt to come up with a opinionated structure for organizing stubs and help teams move faster by generating this structure and most parts of the stubs.

Mbgen helps organize stubs in terms of microservices and scenarios within each microservices.

Example: `orders` microservice can have scenarios like `place_order_ok` and `place_order_out_of_stock_error`

### Installing
```
npm i -D mbgen
```
You'll also need to install Mountebank.
```
npm i mountebank
```
### Usage

Initialize imposters.ejs file and stubs folder for Mountebank:

```npx mbgen init```

Generate a microservice:

```npx mbgen service```

Generate stubs for scenarios in a microservice:

```npx mbgen scenario```

Each scenario has a directory created for it in the specified microservice. The scenario directory will have `ejs` stubs with boiler-plate code which you can edit.

## Built With

* [Plop](https://plopjs.com/)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
