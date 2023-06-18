const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

let mode = 'development';
if (process.env.NODE_ENV === 'production') {
	mode = 'production';
}

const plugins = [
	new HtmlWebpackPlugin({
		template: './src/index.html',
	}),
	new MiniCssExtractPlugin(),
];

module.exports = {
	mode,
	plugins,
	entry: './src/index.tsx',
	devtool: 'source-map',
	output: {
		path: path.resolve(__dirname, 'dist'),
		clean: true,
		publicPath: "/"
	},

	devServer: {
		hot: true,
		historyApiFallback: true,
	},

	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: ["babel-loader"],
			},
			{
				test: /\.(ts|tsx)$/,
				use: ["ts-loader"]
			},
			{
				test: /\.s[ac]ss$/i,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							url: false,
						},
					},
					"sass-loader",
				],
				sideEffects: true,
			},
		],
	},
	resolve: {
		alias: {
			"@/api": path.resolve(__dirname, 'src/api/'),
			"@/components": path.resolve(__dirname, 'src/components/'),
			"@/configs": path.resolve(__dirname, 'src/configs/'),
			"@/constants": path.resolve(__dirname, 'src/constants/'),
			"@/styles": path.resolve(__dirname, 'src/styles/'),
			"@/utils": path.resolve(__dirname, 'src/utils/'),
		},
		extensions: ["*", ".js", ".jsx", ".ts", ".tsx", ".scss", "sass"],
	},
}