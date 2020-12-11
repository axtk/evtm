const babel = require('@rollup/plugin-babel').default;
const {terser} = require('rollup-plugin-terser');

module.exports = {
    input: './index.js',
    output: {
    	name: 'EventManager',
        file: './build/index.js',
        format: 'iife',
    },
    plugins: [
        babel({exclude: 'node_modules/**', babelHelpers: 'bundled'}),
        terser(),
    ],
};
