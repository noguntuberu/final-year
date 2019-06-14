/**
 * 
 */
require('dotenv').config();

module.exports = {
    setUpDatabase(mongoose) {
        let database =  process.env.MONGODB_URI || process.env.MONGOLAB_URI || 
                        process.env.MONGOHQ_URI || process.env.DB;
        //
        mongoose.connect(database);
    }
}