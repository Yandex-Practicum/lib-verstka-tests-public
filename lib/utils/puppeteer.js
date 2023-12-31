"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.launchBrowser = exports.getStyles = exports.getStyle = exports.hasElementBySelectors = void 0;
const puppeteer_1 = __importDefault(require("puppeteer"));
const hasElementBySelectors = async (page, selectors) => {
    const result = await page.evaluate((slctrs) => (!!document.querySelector(slctrs)), selectors);
    return result;
};
exports.hasElementBySelectors = hasElementBySelectors;
const getStyle = async (page, selectors, properties) => {
    const result = await page.evaluate((slctrs, props) => {
        const element = document.querySelector(slctrs);
        if (!element) {
            return [];
        }
        return props.map((property) => (window.getComputedStyle(element).getPropertyValue(property)));
    }, selectors, properties);
    return result;
};
exports.getStyle = getStyle;
const getStyles = async (page, selectors, properties) => {
    const result = await page.evaluate((slctrs, props) => {
        const element = document.querySelector(slctrs);
        if (!element) {
            return [];
        }
        return Object.fromEntries(props.map((property) => ([
            property,
            window.getComputedStyle(element).getPropertyValue(property),
        ])));
    }, selectors, properties);
    return result;
};
exports.getStyles = getStyles;
const launchBrowser = async (url, options = {}) => {
    const { launchOptions = {}, viewport = { height: 800, width: 600 } } = options;
    const browser = await puppeteer_1.default.launch({ ...launchOptions, headless: 'new' });
    const page = await browser.newPage();
    if (viewport) {
        const { height, width } = viewport;
        await page.setViewport({
            height,
            width,
            deviceScaleFactor: 1,
        });
    }
    await page.goto(url, { waitUntil: 'networkidle0' });
    await page.waitForTimeout(3000);
    return { browser, page };
};
exports.launchBrowser = launchBrowser;
//# sourceMappingURL=puppeteer.js.map