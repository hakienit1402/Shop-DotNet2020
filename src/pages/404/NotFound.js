import React, { Component } from "react";
import { Result, Button } from "antd";
class NotFound extends Component {
  render() {
    return (
      <div className="container notfoundpage">
        <Result
          status="404"
          title="404"
          subTitle="Sorry, the page you visited does not exist."
          extra={<Button type="primary">Back Home</Button>}
        />
      </div>
    );
  }
}

export default NotFound;
