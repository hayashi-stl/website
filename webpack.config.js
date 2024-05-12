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
            _15_puzzle: { import: './assets/15-puzzle.ts', filename: './assets/15-puzzle.js' },
            binary_operation_pictures_render:
                { import: './assets/posts/binary-operation-pictures/render.ts', filename: './assets/posts/binary-operation-pictures/render.js' },
            assign_normals_cone_render:
                { import: './assets/posts/assign-normals-cone/render.ts', filename: './assets/posts/assign-normals-cone/render.js' },
            state_cutters_render:
                { import: './assets/posts/state-cutters/render.ts', filename: './assets/posts/state-cutters/render.js' },
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
            clean: true,
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