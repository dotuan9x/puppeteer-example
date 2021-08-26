import Head from 'next/head'

export async function getServerSideProps(context) {
  const { req, query, res, asPath, pathname } = context;
  const host = req.headers.host
  // const puppeteer = require('puppeteer');
  const chromium = require('chrome-aws-lambda');

  console.log('sssss', host)

  await (async () => {
    try {
      const browser = await chromium.puppeteer.launch();
      const page = await browser.newPage();
      await page.goto('https://tuando.net');
      await page.screenshot({path: './public/example.png'});

      await browser.close();
    } catch (e) {
      console.log('error', e)
    }
  })();

  return { props: {screenshot: host + '/example.png'}
  }
}

export default function Home(props) {
  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <img src={props.screenshot}/>
      </main>
    </div>
  )
}


