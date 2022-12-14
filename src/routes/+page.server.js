// @ts-nocheck
/** @type {import('./$types').PageLoad} */
import Dbc from 'dbc-can';
export function load({ params }) {
    const dbc = new Dbc();
    const data = dbc.loadSync('static/DBC_template.dbc');
    console.log(data)
    return data
}