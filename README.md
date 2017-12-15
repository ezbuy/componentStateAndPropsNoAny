a lint to check if React Component's state or props is any. use any as state or props will make many runtime errors.

# Installation

Install dependencies:

```shell
yarn add tslint-component-state-and-props-no-any -D
```

Configure tslint to use the tslint-strict-null-checks folder. Add the following path to the rulesDirectory setting in your tslint.json file:

```json
{
   "rulesDirectory": [
     "node_modules/tslint-component-state-and-props-no-any/rules"
   ],
   "rules": {
     ...
   }
}
```
