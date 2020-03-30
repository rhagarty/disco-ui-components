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

import React from 'react';
import PropTypes from 'prop-types';
// import { Grid, Divider, Icon, Header } from 'semantic-ui-react';
import {
  DiscoverySearch,
  SearchInput,
  SearchResults,
  SearchFacets,
  ResultsPagination,
  DocumentPreview
} from '@ibm-watson/discovery-react-components';

/**
 * Main React object that contains all objects on the web page.
 * This object manages all interaction between child objects as
 * well as making search requests to the discovery service.
 */
class Main extends React.Component {
  constructor(...props) {
    super(...props);
    const { 
      // query data
      data,
      error,
      // query params
      // token for usage metrics
      disco,
      projectId
    } = this.props;

    // change in state fires re-render of components
    this.state = {
      // query data
      data: data,   // data should already be formatted
      disco: disco,
      projectId: projectId,
      error: error
    };
  }
 
  /**
   * render - return all the home page object to be rendered.
   */
  render() {
    const { disco, projectId } = this.state;
    
    return (
      <DiscoverySearch searchClient={disco} projectId={projectId}>
        <SearchInput />
        <SearchResults />
        <SearchFacets />
        <ResultsPagination />
        <DocumentPreview />
      </DiscoverySearch>
      //    <Grid celled className='search-grid'>

      //   {/* Results Panel */}

      //   <Grid.Row className='matches-grid-row'>

      //     {/* Results */}

      //     <Grid.Column width={16}>
      //       <Grid.Row>
      //         <div className="results">
      //           <div className="_container _container_large">
      //             <div className="row">
      //               <div>
      //                 <Header as='h2' block inverted textAlign='left'>
      //                   <Icon name='grid layout' />
      //                   <Header.Content>
      //                     Airbnb Review Data for Austin, TX
      //                   </Header.Content>
      //                 </Header>
      //               </div>
      //               <div>

      //                 <DiscoverySearch searchClient={disco} projectId={projectId}>
      //                   <SearchInput />
      //                   <SearchResults />
      //                   <SearchFacets />
      //                   <ResultsPagination />
      //                   <DocumentPreview />
      //                 </DiscoverySearch>

      //               </div>
      //             </div>
      //           </div>
      //         </div>
      //       </Grid.Row>
      //       <Divider clearing hidden/>

      //     </Grid.Column>

      //   </Grid.Row>
      // </Grid>
    );
  }
}

// type check to ensure we are called correctly
Main.propTypes = {
  data: PropTypes.object,
  disco: PropTypes.object,
  projectId: PropTypes.string,
  error: PropTypes.object
};

module.exports = Main;
