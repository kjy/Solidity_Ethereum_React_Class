import React from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "../routes";

const Header = () => {
  return (
    <Menu style={{ marginTop: "10px" }}>
      <Link route="/">
        <a className="item">CrowdCoin</a>
      </Link>
      <Menu.Menu position="right">
        <Link route="/">
          <a className="item">Campaigns</a>
        </Link>

        <Link route="/campaigns/new">
          <a className="item">+</a>
        </Link>
      </Menu.Menu>
    </Menu>
  );
};

export default Header;
/*

Alternative with Dynamic routing
You don't need to set up a routes or server file any longer if you use next dynamic routing. https://nextjs.org/docs/routing/dynamic-routes

Here's the Header example:

import React from "react";
import { Menu, Icon } from "semantic-ui-react";
import { useRouter } from "next/router";
 
//Hosts the top level layout of our app
const Header = () => {
  const router = useRouter();
  return (
    <Menu style={{ marginTop: "1em" }}>
      <Menu.Item onClick={() => router.push("/")}>CrowdCoin</Menu.Item>
      <Menu.Menu position="right">
        <Menu.Item>Campaigns</Menu.Item>
        <Menu.Item onClick={() => router.push("/campaigns/new")}>
          <Icon name="add circle" />
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
};
export default Header;

*/