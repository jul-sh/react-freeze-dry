import fs from 'fs'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import rimraf from 'rimraf'
import { HelmetProvider } from 'react-helmet-async'

const outputDirectory = './output'

if (fs.existsSync(outputDirectory)) {
  rimraf.sync(outputDirectory)
}
fs.mkdirSync(outputDirectory)

fs.readdirSync('./input/pages').forEach(async function savePage(
  pageDirectoryName
) {
  const { default: PageComponent } = await import(
    `./input/pages/${pageDirectoryName}/index.js`
  )

  const helmetContext = {}

  const app = (
    <HelmetProvider context={helmetContext}>
      <PageComponent />
    </HelmetProvider>
  )

  // Like `renderToString`, this method outputs an HTML string. However it does
  // not include the attributes required for rehydration.
  // Ref: https://reactjs.org/docs/react-dom-server.html#rendertostaticmarkup
  const renderedApp = ReactDOMServer.renderToStaticMarkup(app)

  const html = `
<!doctype html>
<html ${helmetContext.helmet.htmlAttributes.toString()}>
    <head>
        ${helmetContext.helmet.title.toString()}
        ${helmetContext.helmet.meta.toString()}
        ${helmetContext.helmet.link.toString()}
        ${helmetContext.helmet.style.toString()}
        ${helmetContext.helmet.script.toString()}
        ${helmetContext.helmet.noscript.toString()}
    </head>
    <body ${helmetContext.helmet.bodyAttributes.toString()}>
        ${renderedApp}
    </body>
</html>
`
  const outputPath = `${outputDirectory}/${pageDirectoryName}.html`
  fs.writeFileSync(outputPath, html)

  console.log(`Saved the ${pageDirectoryName} page at ${outputPath} ✨.`)
})
