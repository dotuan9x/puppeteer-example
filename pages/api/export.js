const path = require('path');
const fs = require('fs');

export default async function (req, res) {
    console.log('req', req.query.url)
    const {url = ''} = req.query;

    if (url) {
        const path = printPdf(url);
    }

    const dir = fs.realpathSync(process.cwd());
    const filePath = path.relative(dir, './pdf.pdf');

    /*const file = fs.readFileSync(filePath, 'binary');
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=dummy.pdf');
    res.write(file, 'binary');
    res.end();*/

}

const printPdf = async (url) => {
    const puppeteer = require('puppeteer');
    //const chromium = require('chrome-aws-lambda');

    await (async () => {
        try {
            // const browser = await chromium.puppeteer.launch();
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            await page.goto(url);
            await page.screenshot({path: './public/example.png'});

            await browser.close();
        } catch (e) {
            console.log('error', e)
        }
    })();

    return '';
}
