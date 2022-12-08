/** @type {import('./$types').PageLoad} */
import Dbc from 'dbc-can';
export function load({ params }) {
    const dbc = new Dbc();
    const data = dbc.loadSync('static/tesla_can.dbc');
    return data
}