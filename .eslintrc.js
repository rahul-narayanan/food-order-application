module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    extends: [
        "plugin:react/recommended",
        "airbnb"
    ],
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 12,
        sourceType: "module"
    },
    plugins: [
        "react"
    ],
    rules: {
        "quotes": ["error", "double"],
        "comma-dangle": ["error", "never"],
        "no-unused-vars": ["off"],
        "import/prefer-default-export": 0,
        "react/jsx-filename-extension": [
            1,
            {
                extensions: [".js", ".jsx"]
            }
        ],
        "indent": [
            2,
            4,
            {
                SwitchCase: 1,
                VariableDeclarator: 1,
                ArrayExpression: "first",
                outerIIFEBody: 1,
                FunctionDeclaration: {
                    parameters: 1,
                    body: 1
                },
                FunctionExpression: {
                    parameters: 1,
                    body: 1
                },
                CallExpression: {
                    arguments: 1
                },
                ObjectExpression: 1,
                ImportDeclaration: 1,
                flatTernaryExpressions: false,
                ignoredNodes: [
                    "JSXElement",
                    "JSXElement > *",
                    "JSXAttribute",
                    "JSXIdentifier",
                    "JSXNamespacedName",
                    "JSXMemberExpression",
                    "JSXSpreadAttribute",
                    "JSXExpressionContainer",
                    "JSXOpeningElement",
                    "JSXClosingElement",
                    "JSXText",
                    "JSXEmptyExpression",
                    "JSXSpreadChild"
                ],
                ignoreComments: false
            }
        ],
        "react/jsx-indent-props": [
            2,
            4
        ],
        "react/jsx-indent": [
            2,
            4
        ],
        "import/extensions": 0,
        "import/no-unresolved": 0,
        "import/order": 0,
        "no-plusplus": 0,
        "default-case": 1,
        "no-underscore-dangle": [
            0,
            {
                allow: [],
                allowAfterThis: false,
                allowAfterSuper: false,
                enforceInMethodNames: false
            }
        ],
        "prefer-destructuring": [
            1,
            {
                VariableDeclarator: {
                    array: false,
                    object: true
                },
                AssignmentExpression: {
                    array: true,
                    object: true
                }
            },
            {
                enforceForRenamedProperties: false
            }
        ],
        "quote-props": [
            2,
            "consistent-as-needed",
            {
                keywords: false,
                unnecessary: true,
                numbers: false
            }
        ],
        "max-len": [
            "error",
            200,
            2,
            {
                ignoreUrls: true,
                ignoreComments: false,
                ignoreRegExpLiterals: true,
                ignoreStrings: false,
                ignoreTemplateLiterals: true
            }
        ],
        "radix": [
            2,
            "as-needed"
        ],
        "func-names": [
            0,
            "as-needed"
        ],
        "react/destructuring-assignment": 0,
        "react/prefer-stateless-function": 0,
        "react/react-in-jsx-scope": 0,
        "react/no-string-refs": 0,
        "react/no-unknown-property": [
            2,
            {
                ignore: [
                    "class"
                ]
            }
        ],
        "react/style-prop-object": 0,
        "react/prop-types": 0,
        "react/sort-comp": [
            0,
            {
                order: [
                    "static-methods",
                    "instance-variables",
                    "lifecycle",
                    "/^handle.+$/",
                    "getters",
                    "setters",
                    "/^(get|set)(?!(InitialState$|DefaultProps$|ChildContext$)).+$/",
                    "instance-methods",
                    "everything-else",
                    "rendering"
                ]
            }
        ],
        "class-methods-use-this": [
            0,
            {
                exceptMethods: [
                    "requestUrl",
                    "requestMethod",
                    "requestBody",
                    "getInitialState",
                    "render"
                ]
            }
        ],
        "no-restricted-syntax": [
            2,
            "WithStatement"
        ],
        "no-empty": [
            2,
            {
                allowEmptyCatch: true
            }
        ],
        "jsx-a11y/alt-text": 0,
        "jsx-a11y/label-has-associated-control": 0,
        "jsx-a11y/label-has-for": 0,
        "jsx-a11y/click-events-have-key-events": 0,
        "jsx-a11y/no-static-element-interactions": 0,
        "jsx-a11y/no-noninteractive-element-interactions": 0,
        "no-prototype-builtins": 0,
        "guard-for-in": 0,
        "consistent-return": 0,
        "no-param-reassign": 0,
        "jsx-a11y/anchor-is-valid": 0,
        "react/no-array-index-key": 0,
        "no-multi-assign": 0,
        "implicit-arrow-linebreak": 0,
        "react/no-access-state-in-setstate": 0,
        "jsx-a11y/no-noninteractive-tabindex": 0,
        "jsx-a11y/tabindex-no-positive": 0,
        "prefer-rest-params": 0,
        "new-cap": 0,
        "no-mixed-operators": 0,
        "valid-typeof": 2,
        "no-restricted-globals": 0,
        "no-continue": 0,
        "getter-return": 0,
        "no-empty-function": 0,
        "no-bitwise": 0,
        "no-multi-str": 0,
        "no-return-assign": [
            0,
            "always"
        ],
        "react/jsx-props-no-spreading": 0
    }
};
