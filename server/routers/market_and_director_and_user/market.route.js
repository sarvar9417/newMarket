const {
    Market,
    validateMarket
} = require('../../models/MarketAndBranch/Market')

module.exports.register = async (req, res) => {
    
    try {
        const {error} = validateMarket(req.body)

        if (error) {
            return res.status(400).json({
                message: error.message
            })
        }
        const {
            name,
            organitionName,
            image,
            phone1,
            phone2,
            phone3,
            bank,
            bankNumber,
            inn,
            address,
            orientation,
            director,
            mfo,
            administrator
        } = req.body

        const market = await Market.find({name})

        if (market.length > 0) {
            return res.status(400).json({
                message:
                    'Diqqat! Klinika nomida biroz o\'zgartirish qilib keyin kiriting.'
            })
        }

        const newMarket = new Market({
            name,
            organitionName,
            image,
            phone1,
            phone2,
            phone3,
            bank,
            bankNumber,
            inn,
            address,
            orientation,
            director,
            mfo,
            administrator
        })

        await newMarket.save()

        res.status(201).send(newMarket)
    } catch (error) {
        res.status(501).json({message: error})
    }
}

module.exports.edit = async (req, res) => {
    try {
        const {market} = req.body

        const update = await Market.findByIdAndUpdate(market._id, {...market})
        res.status(201).send(update)
    } catch (error) {
        res.status(501).json({message: error})
    }
}

module.exports.getMarket = async (req, res) => {
    try {
        const {market} = req.body
        if (!market) {
            return res.status(400).json({
                message: 'Diqqat! Market ID si ko\'rsatilmagan.'
            })
        }

        const markets = await Market.find().select('name')

        res.status(200).send(markets)
    } catch (error) {
        res.status(501).json({error: 'Serverda xatolik yuz berdi...'})
    }
}
