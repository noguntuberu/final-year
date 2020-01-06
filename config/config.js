/**
 * 
 */
require('dotenv').config();

module.exports = {
    setUpDatabase: async (mongoose, db = null) => {
        let database =  db || process.env.MONGODB_URI || process.env.MONGOLAB_URI || 
                        process.env.MONGOHQ_URI || process.env.DB;
        //
        this.conn = await mongoose.connect(database);
    },
    closeConnection:  async () => {
        await mongoose.closeConnection();
    }
}