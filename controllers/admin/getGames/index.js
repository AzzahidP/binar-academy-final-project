const {
    Game_List
} = require('../../../models')

module.exports = async (req, res) => {
    try {
        const dataSend = await Game_List.findAll()
        
        res.status(200).json({
            result: 'SUCCESS',
            message: dataSend,
        });
    }
    catch (err) {
        res.status(500).json({
            message: err.message || 'Some error occurred while retrieving players',
        });
    }

}