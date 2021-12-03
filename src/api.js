import axios from "axios";

// const BASE_URL = "http://localhost:5000";
// const BASE_URL = "https://fern-development.herokuapp.com";
// const BASE_URL = "http://ac28-71-104-49-45.ngrok.io";
// const BASE_URL = "https://fern-iteration-2.herokuapp.com";

const BASE_URL = "https://fern-iteration-3.herokuapp.com";

export const getAllProducts = async function() {
    return await axios.get(BASE_URL + "/products")
        .then(response => {
            return response["data"]["products"]
        })
}

export const getProductsBySearch = async function(searchWord) {
    return await axios.get(BASE_URL + "/product/search?search_key=" + searchWord)
        .then(response => {
            return response["data"]['products']
        })
}

export const getUserDetails = async function () {
    return await axios.get(BASE_URL + "/user/kSlylzoV8KbTbvSFLUjHxjc1qbo1")
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
    const header = {"Access-Control-Allow-Origin": "*" }
    await axios.post(BASE_URL + "/user/signin", {}, header).then(response => {
        console.log(response)
        //return response
    });
}

export const getSimilarProducts = async function (productId) {
    return await axios.get(BASE_URL + "/product/similar?product_id=" + productId)
    .then(response => {
        return response["data"]["products"]
    })
}

export const spendSpores = async function (type_key) {
    const body = {
        "redeem": {
            "type_key": type_key,
            "quantity": "1"
        }
    }
    await axios.put(BASE_URL + "/spores/redeem", body)
}

export const getSporesHistory = async function () {
    return await axios.get(BASE_URL + "/spores/milestones")
    .then(response => {
        return response["data"]
    })
}

export const sendImage = async function (image) {
    let bodyFormData = new FormData();
    bodyFormData.append("invoice", image)
    let headers = { "Content-Type": "multipart/form-data" }
    return await axios.put(BASE_URL + "/spores/claim", bodyFormData, headers)
}