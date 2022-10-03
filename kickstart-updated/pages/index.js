import React, { Component } from "react";
import { Card, Button } from "semantic-ui-react";
import factory from "../ethereum/factory";
import Layout from "../components/Layout";
import { Link } from "../routes";

class CampaignIndex extends Component {
  static async getInitialProps() { // when you use static, then function is assigned to the class itself and not instances of the class
    // campaignIndex.render();skipping rendering of component of class instance, makes it more efficient; don't create an instance
    // get a list of addresses of deployed campaigns
    const campaigns = await factory.methods.getDeployedCampaigns().call();

    return { campaigns };
  }
  // list of campaigns
  renderCampaigns() {
    // items array
    const items = this.props.campaigns.map((address) => {
      return {  // https://react.semantic-ui.com/views/card/#types-group-props
        header: address,
        description: (
          <Link route={`/campaigns/${address}`}>
            <a>View Campaign</a>
          </Link>
        ),  // show a particular campaign http://localhost:3000/campaigns/0x3A3ea6b1FC50571de25b807967E57E11882d162a
        fluid: true,  // a fluid card takes up the width of its container
      };
    });
    return <Card.Group items={items} />;
  }
  render() {  // jsx code in between <Layout> below will get passed to layout component as props.children
    return (
      <Layout>
        <div>
          <h3>Open Campaigns</h3>
          <Link route="/campaigns/new">
            <a>
              <Button
                floated="right"
                content="Create Campaign"  // button Labeled Icon  https://react.semantic-ui.com/elements/button/
                icon="add circle"
                primary   // adds blue styling the button
              />
            </a>
          </Link>
          {this.renderCampaigns()}
        </div>
      </Layout>
    );
  }
}

export default CampaignIndex;

/*
To do: 
Configure web3 with a provider from metamask
Tell web3 that a deployed copy of the 'CampaignFactory' exists
Use Factory instance to retrieve a list of deployed campaigns
Use React to show something about each campaign


error: window is not defined at localhost: 3000

Next.js makes use of server-side rendering
When someone accesses Next.js server, Next server will take React application and render the entire React app itself.
Next server builds up html document and takes it to the browser.  It is faster than Create-React-App Server.
Rendered html document works faster and ideal for mobile device.
Later, all javascript code is sent down too.  

// window is a global variable that is available only inside of the browser. It is not availabe on Node.js.
// Next.js loads up code so window variable is not defined. Error message shows up. Cannot have direct access to window.

Next Server will fetch data from Ethereum network. Execute requests from server. It does not matter that user has MetaMask or not.
Code is rendered on Next Server and there will be some calls to get list of campaigns, votes, etc., from Ethereum Network.
HTML document wil have the data information.

Semantic UI React - React component kit for CSS styling
https://react.semantic-ui.com/

% npm install next react react-dom
% npm run dev
% npm install --save semantic-ui-react
% npm install --save semantic-ui-css

Pages directory contains each webpage
Components directory, make a layout.js file to house common elements on every separate page, like headers and footers,
add repeating style elements
layout.js will be used in index.js

Campaign List should be a 'child' of Layout

*/