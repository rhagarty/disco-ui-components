/**
 * Copyright 2017 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the 'License'); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */

'use strict';

require('dotenv').config({
  silent: true
});

const fs = require('fs'); // file system for loading JSON

/**
 * Setup for Watson Discovery.
 *
 * @param {Object} params - Params needed to
 * @param {Object} callback - Discovery client
 * @constructor
 */
function WatsonDiscoverySetup(discoveryClient) {
  this.discoveryClient = discoveryClient;
}

/**
 * Find the Discovery collection.
 * If a DISCOVERY_COLLECTION_ID is set then validate it or error out.
 * Otherwise find it by name (DISCOVERY_COLLECTION_NAME). The by name
 * search is used to find collections that we created before a restart.
 * @param {Object} params - Object discribing the existing environment.
 * @return {Promise} Promise with resolve({discovery params}) or reject(err).
 */
WatsonDiscoverySetup.prototype.findDiscoveryCollection = function(params) {
  console.log('findDiscoveryCollection');
  return new Promise((resolve, reject) => {
    this.discoveryClient.listCollections(params, (err, data) => {
      if (err) {
        console.error(err);
        return reject(new Error('Failed to get Discovery collections.'));
      } else {
        console.log('Found Discovery Collections');
        // console.log(JSON.stringify(data, null, 2));
        return resolve(params);
      }
    });
  });
};

/**
 * Validate and setup the Discovery service.
 */
WatsonDiscoverySetup.prototype.setupDiscovery = function(setupParams, callback) {
  this.findDiscoveryCollection(setupParams)
    .then(params => callback(null, params))
    .catch(callback);
};

/**
 * Handle setup errors by logging and exiting.
 * @param {String} reason - The error message for the setup error.
 */
WatsonDiscoverySetup.prototype.handleSetupError = function (reason) {
  console.error('The app failed to initialize properly. Setup and restart needed. ' + reason);
  // Abort on a setup error allowing IBM Cloud to restart it.
  console.error('\nAborting due to setup error!');
  process.exit(1);
};

module.exports = WatsonDiscoverySetup;
