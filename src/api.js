import axios from "axios";

// const BASE_URL = "http://localhost:5000";
const BASE_URL = "https://fern-development.herokuapp.com";

export const getAllProducts = async function () {
    return await axios.get(BASE_URL + "/products")
        .then(response => {
            return response["data"]["products"]
        })
        .catch(error => {
            console.error(error)
            return false
        });
}

export const signIn = async function () {
    await axios.post(BASE_URL + "/user/signin");
}
