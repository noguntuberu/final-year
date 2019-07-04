/**
 * 
 */
//
const aylien = require('aylien_textapi');
class EOMSAnalyzer {

    analyze(actualScore, expectedScore) {
        const result = (actualScore / expectedScore) * 100;
        return Math.round(result) > 0 ? Math.round(result): 0;
    }

    async analyzeTextSentiment(commentData) {
        const analyzer = new aylien({
            application_id: process.env.AYLIEN_ID,
            application_key: process.env.AYLIEN_KEY
        });

        const analysisResult = await analyzer.sentiment({
            text: commentData.body
        });
        
        if (analysisResult.polarity === "negative"){
            return (-1) * analysisResult.polarity_confidence;
        } else {
            return analysisResult.polarity_confidence;
        }
    }
}


module.exports = new EOMSAnalyzer;