module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: [
        '@typescript-eslint',
    ],
    extends: [
        'airbnb-typescript',
        'plugin:prettier/recommended',
    ],
    rules: {
        'no-param-reassign': 'off',
        'react/jsx-props-no-spreading': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/no-unused-expressions': 'off',
        "import/prefer-default-export": "off",
        "no-underscore-dangle": "off",
        'react/destructuring-assignment': 'off',
    },
    parserOptions: {
        project: './tsconfig.json',
    }
};