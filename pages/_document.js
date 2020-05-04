import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import { Helmet } from 'react-helmet';
import { ServerStyleSheet } from 'styled-components';

export default class extends Document {
  static async getInitialProps(...args) {
    const documentProps = await super.getInitialProps(...args);

    const sheet = new ServerStyleSheet();
    const originalRenderPage = args.renderPage;

    try {
      args.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />)
        });

      // const initialProps = await Document.getInitialProps(args);
      return {
        ...documentProps,
        helmet: Helmet.renderStatic(),
        styles: (
          <>
            {documentProps.styles}
            {sheet.getStyleElement()}
          </>
        )
      };
    } finally {
      sheet.seal();
    }

    // see https://github.com/nfl/react-helmet#server-usage for more information
    // 'head' was occupied by 'renderPage().head', we cannot use it
    // return { ...documentProps, helmet: Helmet.renderStatic() };
  }

  // should render on <html>
  get helmetHtmlAttrComponents() {
    return this.props.helmet.htmlAttributes.toComponent();
  }

  // should render on <body>
  get helmetBodyAttrComponents() {
    return this.props.helmet.bodyAttributes.toComponent();
  }

  // should render on <head>
  get helmetHeadComponents() {
    return Object.keys(this.props.helmet)
      .filter(el => el !== 'htmlAttributes' && el !== 'bodyAttributes')
      .map(el => this.props.helmet[el].toComponent());
  }

  render() {
    return (
      <html {...this.helmetHtmlAttrComponents} lang="en">
        <Head>{this.helmetHeadComponents}</Head>
        <body {...this.helmetBodyAttrComponents}>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
