module.exports = {
    root: true,
    parser: "@typescript-eslint/parser",
    plugins: [
        "@typescript-eslint",
        // "jest",
    ],
    extends: [
        // "eslint:recommended",
        // "plugin:@typescript-eslint/recommended",
        // "plugin:jest/recommended",
        "airbnb-typescript",
        "prettier",
        "prettier/@typescript-eslint",
        "plugin:import/errors",
        "plugin:import/warnings",
        "plugin:import/typescript",
        "plugin:node/recommended",
        "plugin:eslint-comments/recommended",
    ],
};