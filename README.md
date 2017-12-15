# Installation
-----
Install dependencies:

```shell
yarn add tslint-component-state-and-props-no-any -D
```

Configure tslint to use the tslint-strict-null-checks folder. Add the following path to the rulesDirectory setting in your tslint.json file:

```json
{
   "rulesDirectory": [
     "node_modules/tslint-strict-null-checks/rules"
   ],
   "rules": {
     ...
   }
}
```
