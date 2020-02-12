// Ensure that there are no errors
const key_var = 'TEXT_ANALYTICS_SUBSCRIPTION_KEY';
// If key is missing, an error is thrown
if (!process.env[key_var] && !config[key_var]) {
    throw new Error('please set/export the following environment variable: ' + key_var);
}
const subscription_key = process.env[key_var] || config[key_var];

const endpoint_var = 'TEXT_ANALYTICS_ENDPOINT';
if (!process.env[endpoint_var] && !config[endpoint_var]) {
    throw new Error('please set/export the following environment variable: ' + endpoint_var);
}
const endpoint = process.env[endpoint_var] || config[endpoint_var];
// Create paths for fetching languages and sentiments from the API
let pathForLanguages = '/v2.1/languages';
let pathForSentiments = '/v2.1/sentiment';
// Function to take in object with property "documents" to hold text to be analyzed in JSON format as a parameter
let get_language = async function (documents) {
    let body = JSON.stringify(documents);
    let url = endpoint + pathForLanguages; // Specify endpoint to be used for language detection request
    let params = {
        headers: {
            'Content-Type': 'application/json',
            'Ocp-Apim-Subscription-Key': "3fa9a825088444a1b6c197c9961e2883"
        }
    };
    // Waits for post request to the URL: set test as body and set headers
    let data = await axios.default.post(url, body, params)
    return data;
}
// Function to provide sentiment with given document
// Range of 0 to 1 (0 being most negative, 1 being most positive)
let get_sentiments = async function (documents) {
    let body = JSON.stringify(documents);
    let url = endpoint + pathForSentiments; // Specify endpoint to be used for language detection request
    let params = {
        headers: {
            'Content-Type': 'application/json',
            'Ocp-Apim-Subscription-Key': "3fa9a825088444a1b6c197c9961e2883"
        }
    };
    // Waits for post request to the URL: set test as body and set headers
    let data = await axios.default.post(url, body, params)
    return data;
}