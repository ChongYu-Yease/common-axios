import typescript from 'rollup-plugin-typescript2'
import postcss from 'rollup-plugin-postcss'
import autoprefixer from 'autoprefixer'
import {
    terser
} from 'rollup-plugin-terser'
import {
    nodeResolve
} from '@rollup/plugin-node-resolve' //将外部引入的js打包进来
import nodePolyfills from 'rollup-plugin-polyfill-node'
import babel from 'rollup-plugin-babel'
import del from 'rollup-plugin-delete'
import json from '@rollup/plugin-json'
import commonjs from '@rollup/plugin-commonjs' // 将CommonJS模块转换为ES6, 方便rollup直接调用
import livereload from 'rollup-plugin-livereload'

const isProduction = process.env.NODE_ENV === 'production'

const initConfig = () => {
    const flexibleOutput = []
    const flexiblePlugins = []

    if (isProduction) {
        // 打算发布的话将代码打包到dist文件夹内
        flexibleOutput.push({
            format: 'umd',
            file: 'dist/common-axios.umd.js',
            name: 'commonAxios',
            globals: {
                axios: 'axios',
                qs: 'qs',
            },
        }, {
            format: 'esm',
            file: 'dist/common-axios.esm.js',
            name: 'commonAxios',
            globals: {
                axios: 'axios',
                qs: 'qs',
            },
        })

        // 发布压缩代码
        flexiblePlugins.push(terser())
    } else {
        // 开发环境 将代码打包到demo文件夹内
        flexibleOutput.push({
            format: 'umd',
            file: 'dist/common-axios.umd.js',
            name: 'commonAxios',
            globals: {
                axios: 'axios',
                qs: 'qs',
            },
        }, {
            format: 'esm',
            file: 'dist/common-axios.esm.js',
            name: 'commonAxios',
            globals: {
                axios: 'axios',
                qs: 'qs',
            },
        })
        flexiblePlugins.push(


            // 热更新
            livereload()
        )
    }
    const defaultConfig = {
        input: './src/index.ts',

        external: ['axios', 'qs'],

        plugins: [
            del({
                targets: ['dist']
            }),

            babel({
                exclude: 'node_modules/**',
                extensions: ['.js', '.jsx'],
                babelHelpers: 'bundled',
            }),

            commonjs(),

            nodeResolve({
                browser: true,
                extensions: ['.jsx', '.js']
            }),

            nodePolyfills(),

            postcss({
                plugins: [autoprefixer()],
            }),

            json(),

            typescript({
                exclude: 'node_modules/**',
                useTsconfigDeclarationDir: true,
                extensions: ['.ts', '.tsx'],
            }),
        ],
    }
    defaultConfig.output = flexibleOutput

    defaultConfig.plugins = defaultConfig.plugins.concat(flexiblePlugins)

    return defaultConfig
}
export default initConfig()