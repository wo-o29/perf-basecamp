const HtmlWebpackPlugin = require('html-webpack-plugin');

const findPreloadFile = (filename, options) => {
  return options.find(
    (option) =>
      filename.startsWith(option?.startsWith ?? '') &&
      filename.endsWith(option?.extension ?? '') &&
      filename.includes(option.keyword)
  );
};

class PreloadPlugin {
  options;

  constructor(options) {
    this.options = options;
  }

  apply(compiler) {
    compiler.hooks.compilation.tap('PreloadPlugin', (compilation) => {
      HtmlWebpackPlugin.getHooks(compilation).beforeEmit.tapAsync(
        'PreloadPlugin',
        (data, callback) => {
          const assets = compilation.getAssets();
          const preloadFiles = assets
            .map((asset) => {
              const filename = asset.name;
              const preloadFile = findPreloadFile(filename, this.options);
              if (preloadFile) {
                return { name: filename, as: preloadFile.as, crossorigin: preloadFile.crossorigin };
              }

              return null;
            })
            .filter((file) => file);

          const links = preloadFiles
            .map((file) => {
              const crossorigin = file.crossorigin ? ` crossorigin="${file.crossorigin}"` : '';
              return `<link rel="preload" as="${file.as}" href="${file.name}" ${crossorigin}/>`;
            })
            .join('\n');
          data.html = data.html.replace(/(<head[^>]*>)/i, `$1\n${links}`);

          callback(null, data);
        }
      );
    });
  }
}

module.exports = PreloadPlugin;
