import React, { Component } from "react";
import { Form, Button, Input, Message } from "semantic-ui-react";
import Layout from "../../components/Layout";
import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";
import { Router } from "../../routes";

//  localhost:3000/campaigns/new  form to make a campaign
// create a nested routing structure
// use input component

// Campaign new component
class CampaignNew extends Component {
  state = {
    minimumContribution: "",
    errorMessage: "",
    loading: false,
  };

  onSubmit = async (event) => {
    event.preventDefault();
    this.setState({ loading: true, errorMessage: "" });

    try {
      // get list of accounts
      const accounts = await web3.eth.getAccounts();
      await factory.methods  // create a new campaign by importing factory instance defined in factory.js in ethereum directory
        .createCampaign(this.state.minimumContribution)
        .send({
          from: accounts[0],
        });
      // redirect user to index route, localhost:3000, you should see list of campaigns
      Router.pushRoute("/");
    } catch (err) {
      this.setState({ errorMessage: err.message }); // need to display error message in render method
    }
    this.setState({ loading: false });  
  };

  render() {
    return (
      <Layout>
        <h3>Create Campaign</h3>
        {/* pass a reference to onSubmit   double boolean flip !!"" goes to False */}
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <label>Minimum Contribution</label>
            <Input
              label="wei"
              labelPosition="right"
              value={this.state.minimumContribution}
              onChange={(event) => // event handler, state value for min. contribution, event object is the new value, 
                this.setState({ minimumContribution: event.target.value })
              }
            />
          </Form.Field>
          {/* Validation logic. Semantic UI requires you to add an error property  */}
          <Message error header="Oops!" content={this.state.errorMessage} />
          <Button loading={this.state.loading} primary>
            Create!
          </Button>
        </Form>
      </Layout>
    );
  }
}

export default CampaignNew;


/*
 https://react.semantic-ui.com/collections/form/#types-form

 https://react.semantic-ui.com/elements/input/   go to Labeled for labeled property

 https://react.semantic-ui.com/collections/message/#variations-negative   Variations to Negative/Error

https://react.semantic-ui.com/elements/button/#states-loading  button spinner


After user makes a campaign, redirect user back to root route to see list of campaigns
Next.js routing system does not do dynamic routing, does not support dynamic routing
/campaigns/Ox123aec   wildcard token

How to fix it: use helper module inside of Next.js application
https://github.com/fridays/next-routes   dynamic routes

npm install next-routes --legacy-peer-deps


Create routes.js file and then setup configuration, then do setup on server

routes.js defines our different routes (CampaignNew and CampaignShow)

Create server.js file to boot up next app, tell it to use all routes defined in routes.js

Routes.js will export navigation helpers to allow components to help user to navigate from campaign new component to somewhere else

*/