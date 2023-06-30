const { Schema, model, Types } = require("mongoose");
const Joi = require("joi");

const saleproduct = new Schema(
  {
    totalprice: { type: Number, required: true },
    totalpriceuzs: { type: Number, required: true },
    unitprice: { type: Number, required: true },
    unitpriceuzs: { type: Number, required: true },
    pieces: { type: Number, required: true },
    previous: { type: Number, required: true },
    next: { type: Number, required: true },
    discount: { type: Schema.Types.ObjectId, ref: "Discount" },
    price: { type: Schema.Types.ObjectId, ref: "ProductPrice" },
    product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    market: { type: Schema.Types.ObjectId, ref: "Market", required: true },
    saleproducts: [{ type: Schema.Types.ObjectId, ref: "SaleProduct" }],
    saleproduct: { type: Schema.Types.ObjectId, ref: "SaleProduct" },
    saleconnector: { type: Schema.Types.ObjectId, ref: "SaleConnector" },
    fromFilial: { type: Number },
    dailysaleconnector: {
      type: Schema.Types.ObjectId,
      ref: "DailySaleConnector",
    },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    isArchive: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

function validateSaleProduct(saleproduct) {
  const schema = Joi.object({
    totalprice: Joi.number().required(),
    totalpriceuzs: Joi.number().required(),
    unitprice: Joi.number().required(),
    unitpriceuzs: Joi.number().required(),
    pieces: Joi.number().required(),
    product: Joi.string().required(),
    market: Joi.string(),
    user: Joi.string(),
  });
  return schema.validate(saleproduct);
}

module.exports.validateSaleProduct = validateSaleProduct;
module.exports.SaleProduct = model("SaleProduct", saleproduct);
