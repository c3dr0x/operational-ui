const path = require("path")
const glob = require("glob")

module.exports = {
  title: "Operational UI",
  sections: [
    {
      name: "Components",
      components: function components() {
        return glob.sync(path.resolve(__dirname, "src/**/*.tsx")).filter(function(module) {
          return /\/[A-Z]\w*\.tsx$/.test(module)
        })
      },
    },
  ],
  resolver: require("react-docgen").resolver.findAllComponentDefinitions,
  propsParser: require("react-docgen-typescript").withCustomConfig("./tsconfig.styleguide.json", {
    propFilter: { skipPropsWithoutDoc: true },
  }).parse,
  skipComponentsWithoutExample: true,
  styleguideComponents: {
    Wrapper: path.join(__dirname, "styleguide/ThemeWrapper"),
    LogoRenderer: path.join(__dirname, "styleguide/LogoAndBanner"),
  },
}
