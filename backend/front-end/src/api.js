import axios from "axios";

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
export const getAllProducts = async function () {
    const response = await axios.get(BASE_URL + "/products", GET_OPTIONS);
    return response.data.products;
}

export const signIn = async function () {
    await axios.post(BASE_URL + "/user/signin");
}
