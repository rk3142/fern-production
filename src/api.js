import axios from "axios";

// const BASE_URL = "http://localhost:5000";
const BASE_URL = "https://fern-development.herokuapp.com";

export const getAllProducts = async function () {
    return await axios.get(BASE_URL + "/products")
        .then(response => {
            return response["data"]["products"]
        })
}

export const getUserDetails = async function () {
    return await axios.get(BASE_URL + "/user/QdC1mAbrsvX22Ba05n4tvnvuwd63")
        .then(response => {
            return response
        })
}

export const signIn = async function () {
    await axios.post(BASE_URL + "/user/signin");
}
