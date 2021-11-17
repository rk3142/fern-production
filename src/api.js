import axios from "axios";

// const BASE_URL = "http://localhost:5000";
// const BASE_URL = "https://fern-development.herokuapp.com";
const BASE_URL = "https://fern-iteration-2.herokuapp.com";

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

export const getProductById = async function (productId) {
    return await axios.get(BASE_URL + "/products/" + productId)
        .then(response => {
            return response['data']
        })
}

export const getAllBookmarks = async function () {
    return await axios.get(BASE_URL + "/bookmarks")
        .then(response => {
            return response['data']['products']
        })
}

export const addBookmark = async function (productId) {
    return await axios.post(BASE_URL + "/bookmarks/" + productId).then(response => response['data'])
}

export const removeBookmark = async function (productId) {
    return await axios.delete(BASE_URL + "/bookmarks/" + productId).then(response => response['data'])
}

export const signIn = async function () {
    await axios.post(BASE_URL + "/user/signin");
}
