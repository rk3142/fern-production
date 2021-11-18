import {getAllProducts, signIn} from "./api";
import axios from "axios";

jest.mock('axios');

it('returns all products', async () => {
  axios.get.mockResolvedValue({
    "data": {
      "products": [
        {
          "product_id": "B097NN6PZC",
          "product_name": "Generic BLM T-Shirt, 100% Super 210 GSM Pima Cotton",
          "product_description": "100% Highest Quality Super 210 GSM Cotton\nImported\nMachine wash cold with like colors, Cold wash inside, Tumble dry low, Warm iron inside out, Do Not Dry Clean, Do Not Bleach\nMachine wash cold with like colors, Cold wash inside, Tumble dry low, Warm iron inside out, Do Not Dry Clean, Do Not Bleach",
          "link": "https://m.media-amazon.com/images/I/61IOdAl8bAS._AC_UL320_.jpg",
          "image_url": "https://m.media-amazon.com/images/I/61IOdAl8bAS._AC_UL320_.jpg",
          "brand": "Generic",
          "rating": 5,
          "ratings": 2,
          "product_type": [
            {
              "product_type": 1,
              "name": "T-shirt"
            }
          ],
          "prices": [
            {
              "product_id": "B097NN6PZC",
              "product_link": "https://www.amazon.com/gp/slredirect/picassoRedirect.html/ref=pa_sp_atf_aps_sr_pg1_1?ie=UTF8&adId=A01297723T9ILEYH5725I&url=%2FT-Shirt-Super-Pima-Cotton-Size%2Fdp%2FB097NN6PZC%2Fref%3Dsr_1_1_sspa%3Fdchild%3D1%26keywords%3Dt-shirts%26qid%3D1635720544%26sr%3D8-1-spons%26psc%3D1&qualifier=1635720544&id=8195719190343937&widgetName=sp_atf",
              "created_at": "2021-10-31T22:51:04.000Z",
              "updated_at": "2021-10-31T22:51:04.000Z",
              "price": 19.99
            }
          ]
        }
      ]
    }
  });

  const products = await getAllProducts();
  expect(products.length).toEqual(1);
  expect(products[0].product_name).toEqual("Generic BLM T-Shirt, 100% Super 210 GSM Pima Cotton");
});

it('sign in user', async () => {
  axios.post.mockResolvedValue({
    'data': 'test'
  })
  await signIn();
  expect(axios.post).toBeCalled();
});