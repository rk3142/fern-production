import {
  addBookmark,
  getAllBookmarks,
  getAllProducts,
  getProductById,
  getProductsBySearch, getSimilarProducts, getSporesHistory,
  getUserDetails, removeBookmark, sendImage,
  signIn, spendSpores
} from "./api";
import axios from "axios";
import apiMock from "./common/ApiMock";

const mockData = apiMock()

jest.mock('axios');

it('returns all products', async () => {
  axios.get.mockResolvedValue({
    "data": {
      "products": mockData
    }
  });

  const products = await getAllProducts();
  expect(products.length).toEqual(mockData.length);
});

it('returns products by search', async () => {
  axios.get.mockResolvedValue({
    "data": {
      "products": mockData
    }
  });

  const products = await getProductsBySearch('search word');
  expect(products.length).toEqual(mockData.length);
});

it('gets user details', async () => {
  axios.post.mockResolvedValue({
    'data': 'test'
  })
  await getUserDetails();
  expect(axios.get).toBeCalled();
});

it('gets product by id', async () => {
  axios.get.mockResolvedValue({
    'data': mockData[0]
  })
  const product = await getProductById(mockData[0]['product_id']);
  expect(product['product_id']).toEqual(mockData[0]['product_id']);
});

it('gets all bookmarked', async () => {
  axios.get.mockResolvedValue({
    'data': {
      'products': mockData
    }
  })
  const products = await getAllBookmarks();
  expect(products.length).toEqual(mockData.length);
});

it('add bookmark', async () => {
  axios.post.mockResolvedValue({
    'data': 'test'
  })
  await addBookmark(mockData[0]['product_id']);
  expect(axios.post).toBeCalled();
});

it('remove bookmark', async () => {
  axios.delete.mockResolvedValue({
    'data': 'test'
  })
  await removeBookmark(mockData[0]['product_id']);
  expect(axios.delete).toBeCalled();
});

it('sign in user', async () => {
  axios.post.mockResolvedValue({
    'data': 'test'
  })
  await signIn();
  expect(axios.post).toBeCalled();
});

it('get similar products', async () => {
  axios.get.mockResolvedValue({
    'data': {
      'products': mockData
    }
  })
  const products = await getSimilarProducts(mockData[0]['product_id']);
  expect(products.length).toEqual(mockData.length);
});

it('spend spores', async () => {
  await spendSpores('test');
  expect(axios.put).toBeCalled();
});

it('get spores history', async () => {
  axios.get.mockResolvedValue({
    'data': 'history'
  })
  await getSporesHistory();
  expect(axios.get).toBeCalled();
});

it('sends image', async () => {
  await sendImage('image');
  expect(axios.put).toBeCalled();
});