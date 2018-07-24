const environment = require('./environment')

environment.loaders.prepend('babel', {
    test: /\.js/,
    exclude: /react-parallax/,
    loader: 'babel-loader',
    plugins: ['transform-class-properties'],
    query: {
        presets: ['react', 'env']
    }
});

module.exports = environment.toWebpackConfig()
