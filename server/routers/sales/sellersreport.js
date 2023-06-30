const { Market } = require('../../models/MarketAndBranch/Market');
const { SaleConnector } = require('../../models/Sales/SaleConnector');
require('../../models/Sales/SaleProduct');
require('../../models/Sales/Discount');
require('../../models/Sales/Payment');
require('../../models/Sales/Packman');
require('../../models/Sales/Client');
require('../../models/Users');
require('../../models/Sales/DailySaleConnector');
require('../../models/Products/Product');
require('../../models/Products/Productdata');

module.exports.getSellersReport = async (req, res) => {
  try {
    const {
      market,
      countPage,
      currentPage,
      startDate,
      endDate,
      search,
      seller,
    } = req.body;
    const marke = await Market.findById(market);
    if (!marke) {
      return res.status(400).json({
        message: `Diqqat! Do'kon haqida malumotlar topilmadi!`,
      });
    }

    const id = new RegExp('.*' + search ? search.id : '' + '.*', 'i');

    const name = new RegExp('.*' + search ? search.client : '' + '.*', 'i');

    const saleconnectors = await SaleConnector.find({
      market,
      id,
      user: seller,
      createdAt: {
        $gte: startDate,
        $lt: endDate,
      },
    })
      .select('-isArchive -updatedAt -market -__v')
      .sort({ _id: -1 })
      .populate({
        path: 'products',
        select:
          'totalprice unitprice totalpriceuzs unitpriceuzs pieces createdAt discount saleproducts product',
        options: { sort: { createdAt: -1 } },
        populate: {
          path: 'product',
          select: 'productdata',
          populate: { path: 'productdata', select: 'name code' },
        },
      })
      .populate(
        'payments',
        'payment paymentuzs comment totalprice totalpriceuzs'
      )
      .populate(
        'discounts',
        'discount discountuzs procient products totalprice totalpriceuzs'
      )
      .populate({ path: 'client', match: { name: name }, select: 'name' })
      .populate('packman', 'name')
      .populate('user', 'firstname lastname')
      .populate('dailyconnectors', 'comment');

    const filter = saleconnectors.filter((item) => {
      return (
        (search.client.length > 0 && item.client !== null && item.client) ||
        search.client.length === 0
      );
    });
    const count = filter.length;
    res.status(200).json({
      saleconnectors: filter.splice(countPage * currentPage, countPage),
      count,
    });
  } catch (error) {
    res.status(400).json({ error: 'Serverda xatolik yuz berdi...' });
  }
};
