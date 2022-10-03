import React from "react";
import { Container } from "semantic-ui-react";
import Head from "next/head";  // Head is a component
import Header from "./Header";

// this file will have common elements across all pages
// jsx code in between <Layout> in index.js below will get passed to layout component as props.children
// container component
const Layout = (props) => {
  return (
    <div>
      <Container>
        <Head>
          <link
            rel="stylesheet"
            href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"
          ></link>
        </Head>
        <Header />
        {props.children}
      </Container>
    </div>
  );
};
export default Layout;

/* 
 https://react.semantic-ui.com/collections/menu/#content-menus
Content/menu   menu is a navigation bar
Logo on left and 2 buttons on right side

https://react.semantic-ui.com/collections/form/
Collections form
*/