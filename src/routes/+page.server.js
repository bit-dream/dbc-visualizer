// @ts-nocheck
/** @type {import('./$types').PageLoad} */
import Dbc from 'dbc-can';
export function load({ params }) {
    const dbc = new Dbc();
    const data = dbc.loadSync('static/Large.dbc');
    console.log(data)
    return data
}