import Head from 'next/head'
import {useState} from "react";
import axios from "axios";

/*export async function getServerSideProps(context) {
  const { req } = context;
  const host = req.headers.host
  // const puppeteer = require('puppeteer');
  const chromium = require('chrome-aws-lambda');

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
}*/

export default function Home(props) {
    const [url, setUrl] = useState('')

    const onChangeUrl = (e) => {
        setUrl(e.target.value)
    }

    const onClickExport = () => {
        if (url) {
            axios.get('/api/export', {
                params: {
                    url: url
                },
                responseType: 'blob',
            }).then((response) => {
                const blob = new Blob([response.data], { type: 'application/pdf' });
                const objectURL = window.URL.createObjectURL(blob);
                window.open(objectURL, '_blank');
            }).catch((error) => {
                console.log('error', error)
            })
        }
    }

    return (
        <div className="container">
            <Head>
                <title>Create Next App</title>
                <link rel="icon" href="/favicon.ico"/>
                <link href="https://unpkg.com/tailwindcss@2.2.7/dist/tailwind.min.css" rel="stylesheet"/>
            </Head>
            <main>
                <div className="mx-auto">
                    <input type="text" onChange={onChangeUrl} style={{width: 300}} className="border"  />

                    <button onClick={onClickExport} type="button" className="py-2 px-4 bg-blue-600 hover:bg-blue-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white transition ease-in duration-200 text-center text-base shadow focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-md">
                        Export
                    </button>
                </div>
            </main>
        </div>
    )
}


