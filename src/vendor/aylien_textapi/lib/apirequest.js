/**
 * Copyright 2016 Aylien, Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

var axios = require('axios'),
    util = require('./util'),
    querystring = require('querystring');

var VERSION = "0.5.0";

function getMissingParams(params, required) {
  if (typeof required === 'string') {
    required = [required];
  }
  required = required.concat(['endpointPath', 'application_id', 'application_key']);
  var missing = [];
  required.forEach(function(param) {
    if (param instanceof Array) {
      var oneOfThese = [];
      param.forEach(function(p) {
        if (!params[p]) { oneOfThese.push(p); }
      });
      if (oneOfThese.length > 1) {
        missing = missing.concat(oneOfThese);
      }
    } else {
      if (!params[param]) {
        missing.push(param);
      }
    }
  });

  return missing.length > 0 ? missing : null;
}

async function createAPIRequest(parameters, required) {
  const missingParams = getMissingParams(parameters, required);
  if (missingParams) {
    throw new Error('Missing required parameters: ' + missingParams.join(', '))
  }

  const { text, endpointPath, application_id, application_key } = parameters;
  const postData = querystring.stringify({
    text,
    mode: text.length >= 150 ? 'document' : 'tweet'
  });
  
  try {
    const response = await axios.post(
      'https://api.aylien.com/api/v1/' + endpointPath,
      postData,
      {
        headers: {
          'Accept': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'User-Agent': 'Aylien Text API Node.js ' + VERSION,
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': Buffer.byteLength(text, 'utf8'),
          'X-AYLIEN-TextAPI-Application-ID': application_id,
          'X-AYLIEN-TextAPI-Application-Key': application_key,
        }
      }
    )
    if (response.status === 200) {
      const data = response.data;
      let rateLimits = {};
      ['limit', 'remaining', 'reset'].forEach(r => {
        rateLimits[r] = parseInt(response.headers['x-ratelimit-' + r] || '0', 10);
      });
      
      return { ...data, ...rateLimits};
    } else {
      const errorString = response.data.error ? response.data.error : response.data;
      throw new Error(errorString);
    }
  } catch (e) {
    throw new Error(e.response.data[0])
  }
}

module.exports = createAPIRequest;
