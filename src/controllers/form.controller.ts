import { Request, Response } from "express";
import { app } from "../app";
import puppeteer from "puppeteer";
import fs from 'fs'
import { getDataForLocalBilling, getDataForLocalBooking, getDataForLocalQuotation, getDataForLumpsumBilling, getDataForLumpsumBooking, getDataForLumpsumQuotation, getDataForOutstationBilling, getDataForOutstationBooking, getDataForOutstationQuotation } from "../utils/form-utils";
import { LocalBilling, LocalBooking, LocalQuotation, LumpsumBilling, LumpsumBooking, LumpsumQuotation, OutstationBilling, OutstationBooking, OutstationQuotation } from "../types";

//local 

export const localQuotation = async (req: Request, res: Response) => {
    const data : LocalQuotation = req.body;
    if (!data) {
        return res.status(400).json({ error: 'Data is required' });
    }
    try {
        const html = await new Promise<string>((resolve, reject) => {
            app.render('local-quotation', { data : getDataForLocalQuotation(data) }, (err, html) => {
                if (err) return reject(err);
                resolve(html);
            });
        });

        const browser = await puppeteer.launch({
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
        });
        const page = await browser.newPage();

        await page.setContent(html, { waitUntil: 'domcontentloaded' });

        const imageBuffer = await page.screenshot({ type: 'png', fullPage: true });

        await browser.close();

        res.set({
            'Cache-Control': 'no-store',
            'Pragma': 'no-cache',
            'Content-Type': 'image/png',
            'Content-Disposition': 'attachment; filename="local-quotation.png"',
            'Content-Length': imageBuffer.length,
        });

        fs.writeFileSync('output.png', imageBuffer);
        res.end(imageBuffer);
    } catch (error) {
        console.error('Error generating image:', error);
        res.status(500).json({ error: 'Failed to generate image' });
    }
}


export const localBooking = async (req: Request, res: Response) => {
    const data : LocalBooking = req.body;
    if (!data) {
        return res.status(400).json({ error: 'Data is required' });
    }
    try {
        const html = await new Promise<string>((resolve, reject) => {
            app.render('local-booking', { data : getDataForLocalBooking(data) }, (err, html) => {
                if (err) return reject(err);
                resolve(html);
            });
        });

        const browser = await puppeteer.launch({
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
        });
        const page = await browser.newPage();

        await page.setContent(html, { waitUntil: 'domcontentloaded' });

        const imageBuffer = await page.screenshot({ type: 'png', fullPage: true });

        await browser.close();

        res.set({
            'Cache-Control': 'no-store',
            'Pragma': 'no-cache',
            'Content-Type': 'image/png',
            'Content-Disposition': 'attachment; filename="local-booking.png"',
            'Content-Length': imageBuffer.length,
        });

        fs.writeFileSync('output.png', imageBuffer);
        res.end(imageBuffer);
    } catch (error) {
        console.error('Error generating image:', error);
        res.status(500).json({ error: 'Failed to generate image' });
    }
}


export const localBilling = async (req: Request, res: Response) => {
    const data : LocalBilling = req.body;
    if (!data) {
        return res.status(400).json({ error: 'Data is required' });
    }
    try {
        const html = await new Promise<string>((resolve, reject) => {
            app.render('local-billing', { data : getDataForLocalBilling(data) }, (err, html) => {
                if (err) return reject(err);
                resolve(html);
            });
        });

        const browser = await puppeteer.launch({
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
        });
        const page = await browser.newPage();

        await page.setContent(html, { waitUntil: 'domcontentloaded' });

        const imageBuffer = await page.screenshot({ type: 'png', fullPage: true });

        await browser.close();

        res.set({
            'Cache-Control': 'no-store',
            'Pragma': 'no-cache',
            'Content-Type': 'image/png',
            'Content-Disposition': 'attachment; filename="local-billing.png"',
            'Content-Length': imageBuffer.length,
        });

        fs.writeFileSync('output.png', imageBuffer);
        res.end(imageBuffer);
    } catch (error) {
        console.error('Error generating image:', error);
        res.status(500).json({ error: 'Failed to generate image' });
    }
}



// -------------------------------------Outstatition-------------------------------------------

export const outstationQuotation = async (req: Request, res: Response) => {
    const data : OutstationQuotation = req.body;
    if (!data) {
        return res.status(400).json({ error: 'Data is required' });
    }
    try {
        const html = await new Promise<string>((resolve, reject) => {
            app.render('outstation-quotation', { data : getDataForOutstationQuotation(data) }, (err, html) => {
                if (err) return reject(err);
                resolve(html);
            });
        });

        const browser = await puppeteer.launch({
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
        });
        const page = await browser.newPage();

        await page.setContent(html, { waitUntil: 'domcontentloaded' });

        const imageBuffer = await page.screenshot({ type: 'png', fullPage: true });

        await browser.close();

        res.set({
            'Cache-Control': 'no-store',
            'Pragma': 'no-cache',
            'Content-Type': 'image/png',
            'Content-Disposition': 'attachment; filename="outstation-quotation.png"',
            'Content-Length': imageBuffer.length,
        });

        fs.writeFileSync('output.png', imageBuffer);
        res.end(imageBuffer);
    } catch (error) {
        console.error('Error generating image:', error);
        res.status(500).json({ error: 'Failed to generate image' });
    }
}


export const outstationBooking = async (req: Request, res: Response) => {
    const data : OutstationBooking = req.body;
    if (!data) {
        return res.status(400).json({ error: 'Data is required' });
    }
    try {
        const html = await new Promise<string>((resolve, reject) => {
            app.render('outstation-booking', { data : getDataForOutstationBooking(data) }, (err, html) => {
                if (err) return reject(err);
                resolve(html);
            });
        });

        const browser = await puppeteer.launch({
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
        });
        const page = await browser.newPage();

        await page.setContent(html, { waitUntil: 'domcontentloaded' });

        const imageBuffer = await page.screenshot({ type: 'png', fullPage: true });

        await browser.close();

        res.set({
            'Cache-Control': 'no-store',
            'Pragma': 'no-cache',
            'Content-Type': 'image/png',
            'Content-Disposition': 'attachment; filename="outstation-booking.png"',
            'Content-Length': imageBuffer.length,
        });

        fs.writeFileSync('output.png', imageBuffer);
        res.end(imageBuffer);
    } catch (error) {
        console.error('Error generating image:', error);
        res.status(500).json({ error: 'Failed to generate image' });
    }
}


export const outstationBilling = async (req: Request, res: Response) => {
    const data : OutstationBilling = req.body;
    if (!data) {
        return res.status(400).json({ error: 'Data is required' });
    }
    try {
        const html = await new Promise<string>((resolve, reject) => {
            app.render('outstation-billing', { data : getDataForOutstationBilling(data) }, (err, html) => {
                if (err) return reject(err);
                resolve(html);
            });
        });

        const browser = await puppeteer.launch({
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
        });
        const page = await browser.newPage();

        await page.setContent(html, { waitUntil: 'domcontentloaded' });

        const imageBuffer = await page.screenshot({ type: 'png', fullPage: true });

        await browser.close();

        res.set({
            'Cache-Control': 'no-store',
            'Pragma': 'no-cache',
            'Content-Type': 'image/png',
            'Content-Disposition': 'attachment; filename="outstation-billing.png"',
            'Content-Length': imageBuffer.length,
        });

        fs.writeFileSync('output.png', imageBuffer);
        res.end(imageBuffer);
    } catch (error) {
        console.error('Error generating image:', error);
        res.status(500).json({ error: 'Failed to generate image' });
    }
}

// ------------------------------------------ Lumpsum -----------------------------------------



export const lumpsumQuotation = async (req: Request, res: Response) => {
    const data : LumpsumQuotation = req.body;
    if (!data) {
        return res.status(400).json({ error: 'Data is required' });
    }
    try {
        const html = await new Promise<string>((resolve, reject) => {
            app.render('lumpsum-quotation', { data : getDataForLumpsumQuotation(data) }, (err, html) => {
                if (err) return reject(err);
                resolve(html);
            });
        });

        const browser = await puppeteer.launch({
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
        });
        const page = await browser.newPage();

        await page.setContent(html, { waitUntil: 'domcontentloaded' });

        const imageBuffer = await page.screenshot({ type: 'png', fullPage: true });

        await browser.close();

        res.set({
            'Cache-Control': 'no-store',
            'Pragma': 'no-cache',
            'Content-Type': 'image/png',
            'Content-Disposition': 'attachment; filename="lumpsum-quotation.png"',
            'Content-Length': imageBuffer.length,
        });

        fs.writeFileSync('output.png', imageBuffer);
        res.end(imageBuffer);
    } catch (error) {
        console.error('Error generating image:', error);
        res.status(500).json({ error: 'Failed to generate image' });
    }
}


export const lumpsumBooking = async (req: Request, res: Response) => {
    const data : LumpsumBooking = req.body;
    if (!data) {
        return res.status(400).json({ error: 'Data is required' });
    }
    try {
        const html = await new Promise<string>((resolve, reject) => {
            app.render('lumpsum-booking', { data : getDataForLumpsumBooking(data) }, (err, html) => {
                if (err) return reject(err);
                resolve(html);
            });
        });

        const browser = await puppeteer.launch({
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
        });
        const page = await browser.newPage();

        await page.setContent(html, { waitUntil: 'domcontentloaded' });

        const imageBuffer = await page.screenshot({ type: 'png', fullPage: true });

        await browser.close();

        res.set({
            'Cache-Control': 'no-store',
            'Pragma': 'no-cache',
            'Content-Type': 'image/png',
            'Content-Disposition': 'attachment; filename="lumpsum-booking.png"',
            'Content-Length': imageBuffer.length,
        });

        fs.writeFileSync('output.png', imageBuffer);
        res.end(imageBuffer);
    } catch (error) {
        console.error('Error generating image:', error);
        res.status(500).json({ error: 'Failed to generate image' });
    }
}


export const lumpsumBilling = async (req: Request, res: Response) => {
    const data : LumpsumBilling = req.body;
    if (!data) {
        return res.status(400).json({ error: 'Data is required' });
    }
    try {
        const html = await new Promise<string>((resolve, reject) => {
            app.render('lumpsum-billing', { data : getDataForLumpsumBilling(data) }, (err, html) => {
                if (err) return reject(err);
                resolve(html);
            });
        });

        const browser = await puppeteer.launch({
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
        });
        const page = await browser.newPage();

        await page.setContent(html, { waitUntil: 'domcontentloaded' });

        const imageBuffer = await page.screenshot({ type: 'png', fullPage: true });

        await browser.close();

        res.set({
            'Cache-Control': 'no-store',
            'Pragma': 'no-cache',
            'Content-Type': 'image/png',
            'Content-Disposition': 'attachment; filename="lumpsum-billing.png"',
            'Content-Length': imageBuffer.length,
        });

        fs.writeFileSync('output.png', imageBuffer);
        res.end(imageBuffer);
    } catch (error) {
        console.error('Error generating image:', error);
        res.status(500).json({ error: 'Failed to generate image' });
    }
}