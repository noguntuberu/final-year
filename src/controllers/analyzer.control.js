/**
 * 
 */
//
const aylien = require('aylien_textapi');
class EOMSAnalyzer {

    analyze(actualScore, expectedScore) {
        const result = Math.round((actualScore / expectedScore) * 100);
        return result > 0 ? result: 0;
    }

    async analyzeTextSentiment(commentData) {
        try {
            const analyzer = new aylien({
                application_id: process.env.AYLIEN_ID,
                application_key: process.env.AYLIEN_KEY
            });
    
            const analysisResult = await analyzer.sentiment({
                text: commentData.body
            });
            
            return analysisResult.polarity_confidence;
        } catch (err) {
            console.log(err);
        }
    }
}


module.exports = new EOMSAnalyzer;