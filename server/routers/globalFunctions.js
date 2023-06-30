const { reduce } = require("lodash");
const { Category, ProductData, Unit, Product, ProductPrice } =
  require("./constants").models;

const createCategory = ({ market, name, code }) => {
  const newCategory = new Category({
    market,
    name,
    code,
  });
  return newCategory.save();
};

const createProductData = ({
  market,
  name,
  code,
  category,
  product,
  unit,
  barcode,
}) => {
  const newProductData = new ProductData({
    market,
    name,
    code,
    category,
    product,
    unit,
    barcode,
  });
  return newProductData.save();
};

const createUnit = ({ market, name }) => {
  const newUnit = new Unit({
    market,
    name,
  });
  return newUnit.save();
};

const createProduct = ({
  market,
  category,
  productdata,
  unit,
  price,
  minimumcount,
  total,
}) => {
  const newProduct = new Product({
    market,
    category,
    productdata,
    unit,
    price,
    minimumcount,
    total,
  });
  return newProduct.save();
};

const createProductPrice = ({
  market,
  product,
  sellingprice,
  sellingpriceuzs,
  incomingprice,
  incomingpriceuzs,
  tradeprice,
  tradepriceuzs,
}) => {
  const newProductPrice = new ProductPrice({
    market,
    product,
    sellingprice,
    sellingpriceuzs,
    incomingprice,
    incomingpriceuzs,
    tradeprice,
    tradepriceuzs,
  });
  return newProductPrice.save();
};

module.exports = {
  createCategory,
  createProductData,
  createUnit,
  createProduct,
  createProductPrice,
};

module.exports.reducer = (arr, el) =>
  reduce(arr, (prev, item) => prev + (item[el] || 0), 0);
module.exports.reducerDuobleProperty = (arr, el1, el2) =>
  reduce(arr, (prev, item) => prev + (item[el1][el2] || 0), 0);

module.exports.roundToUzs = (number) => Math.round(number * 1) / 1;
module.exports.roundToUsd = (number) => Math.round(number * 1000) / 1000;

module.exports.regExpression = (expression) =>
  new RegExp(".*" + expression + ".*", "i");
