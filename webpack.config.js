const path = require('path');
const AssetsPlugin = require('assets-webpack-plugin')
const assets = new AssetsPlugin({
    entrypoints: true,
    filename: 'webpack-assets.json',
})

module.exports = (env, argv) => {
    let config = {
        entry: {
            answer_check:  { import: './assets/answer-check.ts' , filename: './assets/answer-check.js' },
            gltf_viewer: { import: './assets/gltf-viewer.ts', filename: './assets/gltf-viewer.js' },
        },
        //devtool: 'inline-source-map',
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                }
            ]
        },
        resolve: {
            extensions: [ '.tsx', '.ts', '.js' ]
        },
        output: {
            filename: '.deps/[name].js',
            path: path.resolve(__dirname, '.webpack'),
        },
        optimization: {
            runtimeChunk: 'single',
            splitChunks: {
                chunks: 'all'
            }
        },
        plugins: [assets]
    };
    if (argv.mode == 'development')
        config.devtool = 'inline-source-map';
    return config;
}