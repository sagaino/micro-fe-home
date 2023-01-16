const { ModuleFederationPlugin } = require("webpack").container;
const deps = require("./package.json").dependencies;

module.exports = () => ({
  webpack: {
    configure: {
      output: {
        publicPath: "auto",
      }
    },
    plugins: {
      add: [
        new ModuleFederationPlugin({
          name: "home",
          filename: "remoteEntry.js",
          exposes: {
            "./homepage": "./src/components/index.tsx",
            "./pokemonitem": "./src/components/pokemonItem.tsx",
            "./detailpokemon": "./src/components/detailPokemon.tsx",
            "./appPoke": "./src/App.tsx"
          },
          shared: {
            ...deps,
            // ui: {
            //   singleton: true,
            // },
            react: {
              singleton: true,
              requiredVersion: deps.react,
            },
            'react-dom': {
              singleton: true,
              requiredVersion: deps["react-dom"],
            },
          },
        }),
      ]
    }
  },
});