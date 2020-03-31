import React from "react";
import DashBoardLayout from "../../layout/layout";

export default class HomePage extends React.Component {
  render() {
    const user = this.props.location.state;
    console.log(user.user);

    return <DashBoardLayout></DashBoardLayout>;
  }
}
