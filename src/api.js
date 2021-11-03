// const BASE_URL = "http://localhost:5000";
const BASE_URL = "https://fern-development.herokuapp.com";

const HEADERS = {
    "Access-Control-Allow-Origin": '*',
    "Content-Type": "application/json"
}
const POST_OPTIONS = {
    method: 'POST',
    headers: HEADERS
}

const GET_OPTIONS = {
    method: 'GET',
    headers: HEADERS
}

// TODO
export const getList = async function () {
    const response = await fetch(BASE_URL + "/catalog", GET_OPTIONS);
    return response.json();
}