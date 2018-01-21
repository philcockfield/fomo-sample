import { React } from '../common';
import * as next from '@tdb/web/lib/server/document';

next.fastClick(); // Speed up clicks on mobile devices.

export default class MyDocument extends next.Document {
  public static async getInitialProps(args: next.IDocumentGetInitialProps) {
    const { req, res } = args;

    // Check for unsupported browser.
    const browser = next.browser(args);
    if (req.url !== '/browser' && browser.msie) {
      return res.redirect('/browser');
    }

    // Prepare various flags you'd like to pass to the page.
    const isDev = next.isDev(args);
    const options = { isDev };

    // Render the page with server-side CSS.
    const page = next.renderCss(args);
    return { ...page, ...options };
  }

  public render() {
    const props = this.props as any;
    return (
      <html>
        <next.Head>
          <title>Team</title>
          <meta
            name={'viewport'}
            content={'width=device-width, initial-scale=1'}
          />
          <link rel={'icon'} type={'image/x-icon'} href={`/favicon.ico`} />
          <next.Stylesheet href={`/css/normalize.css`} />
          <next.Stylesheet href={`/css/global.css`} />
          <style dangerouslySetInnerHTML={{ __html: props.css }} />
        </next.Head>
        <body>
          <next.Main />
          <next.NextScript />
        </body>
      </html>
    );
  }
}
