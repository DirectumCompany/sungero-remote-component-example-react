const { ModuleFederationPlugin } = require('webpack').container;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const SungeroRemoteComponentMetadataPlugin = require('@directum/sungero-remote-component-metadata-plugin')
const { dependencies } = require('./package.json');
const manifest = require('./component.manifest');

module.exports = (env, argv) => {
  const devMode = argv.mode === 'development';
  const standaloneMode = env.mode === 'standalone';

  const generateMetadataPlugin = new SungeroRemoteComponentMetadataPlugin(manifest);
  const publicName = generateMetadataPlugin.getPublicName();
  return {
    entry: {
      index: './index.js',
      [publicName]: './public-path.js'
    },
    devtool: devMode ? 'eval-source-map' : 'nosources-source-map',
    output: {
      publicPath: '',
      clean: true,
      filename: devMode ? `[name]_${manifest.componentVersion}.js` : `[name]_${manifest.componentVersion}_[chunkhash:8].js`,
      chunkFilename: devMode ? `chunks/[name]_${manifest.componentVersion}.js` : `chunks/[name]_${manifest.componentVersion}_[chunkhash:8].js`,
    },
    resolve: {
      modules: [ 'etc', 'src', 'node_modules' ],
      extensions: ['.tsx', '.ts', '.js'],
    },
    module: {
      rules: [
        {
          test: /\.(jpg|png|gif|jpeg)$/,
          loader: 'url-loader',
        },
        {
          test: /\.css$/,
          use: [
            { loader: standaloneMode ? 'style-loader' : MiniCssExtractPlugin.loader },
            { loader: 'css-loader' }
          ],
        },
        {
          test: /\.tsx?$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
          options: {
            presets: ['@babel/preset-react', '@babel/preset-typescript'],
          }
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/,
          type: 'asset/resource',
          generator: {
            filename: function(file) {
              return `images/[name]_${manifest.componentVersion}.[ext]`;
            }
          }
        }
      ]
    },
    optimization: {
      minimizer: [
        new TerserPlugin({
          parallel: true,
          terserOptions: {
            mangle: true,
            format: {
              comments: false
            }
          },
          exclude: [ /\.min\.js$/gi ] // skip pre-minified libs
        }),
        new CssMinimizerPlugin({
          minimizerOptions: {
            preset: [
              'default',
              {
                discardComments: { removeAll: true },
                colormin: false
              },
            ],
          },
        })
      ]
    },
    plugins: standaloneMode ? [ new HtmlWebpackPlugin({ template: './index.html' }) ] : 
    [
      new MiniCssExtractPlugin({ 
        filename: devMode ? 'css/[name].css' : 'css/[name].[contenthash:8].css',
        // Убрать insert, если требуется поднять приоритет стилей стороннего контрола над стилями веб клиента.
        insert: linkTag => document.head.prepend(linkTag)
      }),
      new ModuleFederationPlugin({
        name: publicName,
        filename: 'remoteEntry.js',
        exposes: {
          loaders: './component.loaders.ts',
          publicPath: './public-path.js'
        },
        shared: {
          //...deps,
          react: {
            requiredVersion: dependencies.react
          },
          'react-dom': {
            requiredVersion: dependencies['react-dom']
          },
          i18next: {
            eager: false,
            singleton: true,
            requiredVersion: dependencies.i18next
          }
        },
      }),
      generateMetadataPlugin
    ]
  }
}
