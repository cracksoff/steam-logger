import SteamCommunity from 'steamcommunity'
export const community = new SteamCommunity()
export const { LOGIN, PASS } = process.env

export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

import readlineSync from 'readline-sync'
export const rl = readlineSync

export { gotScraping as got } from 'got-scraping'

import NodeCache from 'node-cache'
export const cache = new NodeCache()
