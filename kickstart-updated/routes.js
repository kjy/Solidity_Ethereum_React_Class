// () means that require statement returns a function
const routes = require("next-routes")();

// routing rules, mapping, if user goes to address, then go to campaigns/show
routes
  .add("/campaigns/new", "/campaigns/new")
  .add("/campaigns/:address", "/campaigns/show") // wildcard is :, call it variable(property) name address
  .add("/campaigns/:address/requests", "/campaigns/requests/index")
  .add("/campaigns/:address/requests/new", "/campaigns/requests/new");

module.exports = routes; // exports helpers

/*

Restart server when a route is added so changes can take effect.

routes from Localhost: 3000:

/                               List of Campaigns

/campaigns/new                  Form to make a campaign

/campaigns/0x8147               Campaign details for campaign at address 0x8147

/campaigns/ox8147/requests      Requests for campaign at address 0x8147

/campaigns/ox8147/requests/new  Form to create a request for campaign at address 0x8147

*/