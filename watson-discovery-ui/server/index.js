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

require('isomorphic-fetch');
const WatsonDiscoverySetup = require('../lib/watson-discovery-setup');
const DiscoveryV2 = require('ibm-watson/discovery/v2');
const utils = require('../lib/utils');

/**
 * Back end server which handles initializing the Watson Discovery
 * service, and setting up route methods to handle client requests.
 */

const DEFAULT_NAME = 'airbnb-austin-data';
const projectId = 'd07e5270-5181-4a1c-aa97-fe9711116b92';

const discovery = new DiscoveryV2({
  version: '2019-03-25'
});

const discoverySetup = new WatsonDiscoverySetup(discovery);
const discoverySetupParams = { 
  projectId: projectId,
  default_name: DEFAULT_NAME, 
  config_name: 'airbnb-keyword-extraction'   // instead of 'Default Configuration'
};

const WatsonDiscoServer = new Promise((resolve) => {
  discoverySetup.setupDiscovery(discoverySetupParams, (err, data) => {
    if (err) {
      discoverySetup.handleSetupError(err);
    } else {
      console.log('Dicovery is ready!');
      // now load data into discovery service collection
      resolve(createServer());
    }
  });
});

/**
 * createServer - create express server and handle requests
 * from client.
 */
function createServer() {
  const server = require('./express');

  // initial start-up request
  server.get('/*', function(req, res) {
    console.log('In /*');

    res.render('index', { 
      data: {},
      disco: discovery,
      projectId: projectId
    });
    
  });

  return server;
}

module.exports = WatsonDiscoServer;
