const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const webpack = require('webpack');

/* <---__ Процесс разработки Development vs Production __---> */

/* <---__ Проверяем для какого процесса идет разработка Dev или Prod __---> */

const mode = process.env.NODE_ENV || 'development';

const devMode = mode === 'development';

/* <---__ Определяем для каких браузеров проводится сборка __---> */

const target = devMode ? 'web' : 'browserslist';

/* <---__ Добавляет souerce-map пути для css файлов __---> */

const devtool = devMode ? 'source-map' : undefined;

module.exports = {
  mode,
  target,
  devtool,

  /* <---__ Настройка сервера __---> */

  devServer: {
    port: 3000,
    open: true,
    hot: true,
  },

  /* <---__ Точка входа файла __---> */

  entry: {
    main: path.resolve(__dirname, `./source/index.js`),
  },

  /* <---__ Точка выхода файла __---> */

  output: {
    path: path.resolve(__dirname, `./app`),
    clean: true,
    filename: `./js/index.[contenthash].js`,
  },

  /* <---__ Module __---> */

  module: {
    rules: [
      /* <---__ Java Script __---> */

      {
        test: /\.m?js$/i,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },

      /* <---__ SCSS __---> */

      {
        test: /\.(sa|sc|c)ss$/i,
        exclude: /node_modules/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    'postcss-preset-env',
                    {
                      // Options
                    },
                  ],
                ],
              },
            },
          },
          {
            loader: 'sass-loader',
          },
        ],
      },

      /* <---__ FONTS __---> */

      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/font/[name][ext]',
        },
      },

      /* <---__ IMAGE __---> */

      {
				test: /\.(?:|png|svg|jpg|jpeg|gif)$/i,
				type: 'asset/resource',
				generator: {
					filename: 'assets/image/[hash][ext][query]',
					},
				use: [
					{
						loader: "image-webpack-loader",
						options: {
							mozjpeg: {
								progressive: true,
								quality: 70,
							},
							optipng: {
								progressive: true,
								quality: 70,
							},
							pngquant: {
								quality: [0.65, 0.90],
          			speed: 4,
							},
							webp: {
								quality: 75,
							},
						},
					},
				],
			},

    ],
  },

  

  /* <---__ EXTANSIONS ( Позволяет не дописывать окончание файлов ) __---> */

  resolve: {
    extensions: ['*', '.js', '.jsx', '.scss'],
  },

  /* <---__ PLUGINS __---> */

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      favicon: './public/assets/image/favicon.svg',
      inject: 'body',
    }),
    new MiniCssExtractPlugin({
      filename: `./css/style.css`,
    }),
  ],
};
