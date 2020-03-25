import { readFileSync } from 'fs';
import { sanitizeHtml } from './sanitizer';
import { ParsedRequest } from './types';

const rglr = readFileSync(`${__dirname}/../fonts/Inter-Regular.woff2`).toString('base64');
const bold = readFileSync(`${__dirname}/../fonts/Inter-Bold.woff2`).toString('base64');

function getCss(): string {
    return `
    @font-face {
        font-family: 'Inter';
        font-style:  normal;
        font-weight: normal;
        src: url(data:font/woff2;charset=utf-8;base64,${rglr}) format('woff2');
    }
    @font-face {
        font-family: 'Inter';
        font-style:  normal;
        font-weight: bold;
        src: url(data:font/woff2;charset=utf-8;base64,${bold}) format('woff2');
    }
    body {
        background: black;
        height: 100vh;
    }
    .container {
        padding: 200px 80px 200px;
        width: 2048px;
        height: 1170px;
        background: #051221;
        background: linear-gradient(146deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 80%, rgba(0,212,255,1) 140%);
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }
    .heading {
        font-family: 'Inter', sans-serif;
        font-size: 112px;
        font-style: normal;
        color: #eaeaea;
        text-decoration: underline;
        text-decoration-color: rgba(0,212,255,1);
        text-underline-position: under;
        line-height: 1.8;
    }
    .readTime {
        font-family: 'Inter', sans-serif;
        font-size: 70px;
        margin-top: 80px;
        font-weight: bold;
        color: #eaeaea
    }`;
}

export function getHtml(parsedReq: ParsedRequest) {
    const { text, readTime } = parsedReq;
    return `<!DOCTYPE html>
<html>
    <meta charset="utf-8">
    <title>Generated Image</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        ${getCss()}
    </style>
    <body>
        <div class="container">
            <div class="heading">${sanitizeHtml(text)}</div>
            <div class="readTime">${readTime} min${readTime !== '1' ? 's' : ''} read</div>
        </div>
    </body>
</html>`;
}