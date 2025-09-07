const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const PreloadPlugin = require('./PreloadPlugin');

module.exports = {
  entry: './src/index.tsx',
  resolve: { extensions: ['.ts', '.tsx', '.js', '.jsx'] },
  output: {
    filename: '[name].[contenthash].js',
    path: path.join(__dirname, '/dist'),
    clean: true,
    assetModuleFilename: './static/[name][contenthash][ext]'
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist')
    },
    port: 3000,
    open: true,
    hot: true,
    historyApiFallback: true,
    client: {
      overlay: true
    }
  },
  devtool: 'source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html'
    }),
    new PreloadPlugin([
      {
        startsWith: './static/',
        keyword: 'JosefinSans',
        as: 'font',
        crossorigin: 'anonymous'
      }
    ]),
    new CopyWebpackPlugin({
      patterns: [{ from: './public', to: './public' }]
    }),
    new Dotenv(),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false,
      generateStatsFile: true,
      statsFilename: 'bundle-stats.json',
      reportFilename: 'bundle-report.html'
    })
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/i,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader'
        }
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif|webm|mp4)$/i,
        type: 'asset/resource'
      }
    ]
  },
  optimization: {
    minimize: true,
    minimizer: [
      '...',
      new ImageMinimizerPlugin({
        deleteOriginalAssets: false,
        minimizer: {
          implementation: ImageMinimizerPlugin.sharpMinify
        },
        generator: [
          {
            preset: 'avif-pc',
            implementation: ImageMinimizerPlugin.sharpGenerate,
            options: {
              encodeOptions: { avif: { quality: 50 } },
              resize: { enabled: true, width: 1920 }
            }
          },
          {
            preset: 'avif-tablet',
            implementation: ImageMinimizerPlugin.sharpGenerate,
            options: {
              encodeOptions: { avif: { quality: 50 } },
              resize: { enabled: true, width: 1024 }
            }
          },
          {
            preset: 'avif-mobile',
            implementation: ImageMinimizerPlugin.sharpGenerate,
            options: {
              encodeOptions: { avif: { quality: 50 } },
              resize: { enabled: true, width: 768 }
            }
          },
          {
            preset: 'webp-pc',
            implementation: ImageMinimizerPlugin.sharpGenerate,
            options: {
              encodeOptions: { webp: { quality: 75 } },
              resize: { enabled: true, width: 1920 }
            }
          },
          {
            preset: 'webp-tablet',
            implementation: ImageMinimizerPlugin.sharpGenerate,
            options: {
              encodeOptions: { webp: { quality: 75 } },
              resize: { enabled: true, width: 1024 }
            }
          },
          {
            preset: 'webp-mobile',
            implementation: ImageMinimizerPlugin.sharpGenerate,
            options: {
              encodeOptions: { webp: { quality: 75 } },
              resize: { enabled: true, width: 768 }
            }
          }
        ]
      })
    ]
  }
};
