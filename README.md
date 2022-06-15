# eslint-plugin-smx

A set of extended eslint rules

## install

```
npm i --save-dev eslint-plugin-smx
```

## padding-block

Pad a block with empty line before and after. When one single statement in between, no empty line is allowed.

in `.eslintrc.json`

```json
{
    "extends": [
        "plugin:smx/recommended"
    ]
}
```

or override the rules

```json
{
    "plugins": [
        "smx"
    ],
    "rules": {
      "smx/padding-block": "error"
    }
}
```
