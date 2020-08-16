import { Comment, Avatar, Form, Button, List, Input, Rate } from "antd";
import moment from "moment";
import React, { Component } from "react";

const { TextArea } = Input;

const CommentList = ({ comments, count }) => (
  <List
    dataSource={comments}
    header={`${comments.length} ${comments.length > 1 ? "Reviews" : "Review"}`}
    itemLayout="horizontal"
    renderItem={(props) => (
      <div>
        <Comment {...props} />
        <br />
        <Rate disabled defaultValue={count} />
      </div>
    )}
  />
);

const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <>
    <Form.Item>
      <TextArea
        rows={2}
        onChange={onChange}
        value={value}
        style={{ width: 500 }}
      />
    </Form.Item>
    <Form.Item>
      <Button
        htmlType="submit"
        loading={submitting}
        onClick={onSubmit}
        type="primary"
      >
        Add Comment
      </Button>
    </Form.Item>
  </>
);

class Review extends Component {
  state = {
    comments: [],
    submitting: false,
    value: "",
    count: 1,
  };

  handleSubmit = (count) => {
    if (!this.state.value) {
      return;
    }

    this.setState({
      submitting: true,
    });

    setTimeout(() => {
      this.setState({
        submitting: false,
        value: "",

        comments: [
          {
            // actions: [
            //   <Rate disabled defaultValue={this.state.count} />,
            // ],
            author: "Hà Kiên",

            avatar:
              "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
            content: (
              <div>
                {this.state.value}
                {/* <Rate disabled defaultValue={this.state.count} /> */}
              </div>
            ),
            datetime: moment().fromNow(),
          },
          ...this.state.comments,
        ],
      });
    }, 1000);
  };

  handleChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  };

  handleRateChange = (value) => {
    this.setState({
      count: value,
    });
    console.log(this.state.count);
  };

  render() {
    const { comments, submitting, value, count } = this.state;

    return (
      <>
        <Comment
          avatar={
            <Avatar
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              alt="Han Solo"
            />
          }
          content={
            <Editor
              onChange={this.handleChange}
              onSubmit={this.handleSubmit}
              submitting={submitting}
              value={value}
            />
          }
        />
        <Rate onChange={this.handleRateChange} value={count} />
        {comments.length > 0 && (
          <CommentList comments={comments} count={count} />
        )}
      </>
    );
  }
}

export default Review;
