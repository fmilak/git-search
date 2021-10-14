import { Form, Row, Col, Input, Button } from "antd";
import { observer } from "mobx-react";
import { useEffect } from "react";
import { useContext } from "react";
import { RootContext } from "../App";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

const LoginView = observer(() => {
  const { loginStore, restStore } = useContext(RootContext);

  useEffect(() => {
    loginStore.restStore = restStore;
  }, [loginStore, restStore]);

  return (
    <div style={{ marginTop: 50 }}>
      <Form>
        <Row>
          <Col
            span={24}
            style={{
              alignContent: "center",
              justifyContent: "center",
              display: "flex",
              marginBottom: 25,
            }}
          >
            <label style={{ fontSize: 50 }}>GitHub Search</label>
          </Col>
        </Row>
        <Row>
          <Col
            span={24}
            style={{
              alignContent: "center",
              justifyContent: "center",
              display: "flex",
              marginBottom: 25,
            }}
          >
            <label style={{ fontSize: 28 }}>Login</label>
          </Col>
        </Row>
        <Row>
          <Col
            span={24}
            style={{
              alignContent: "center",
              justifyContent: "center",
              display: "flex",
            }}
          >
            <Col span={8}>
              <Form.Item>
                <Input
                  prefix={<UserOutlined />}
                  placeholder="Username"
                  onChange={loginStore.onUsernameChange}
                  onPressEnter={loginStore.tryLogin}
                />
              </Form.Item>
            </Col>
          </Col>
        </Row>
        <Row>
          <Col
            span={24}
            style={{
              alignContent: "center",
              justifyContent: "center",
              display: "flex",
            }}
          >
            <Col span={8}>
              <Form.Item>
                <Input
                  prefix={<LockOutlined />}
                  type="password"
                  placeholder="Password"
                  onPressEnter={loginStore.tryLogin}
                  onChange={loginStore.onPasswordChange}
                />
              </Form.Item>
            </Col>
          </Col>
        </Row>
        <Row>
          <Col
            span={24}
            style={{
              alignContent: "center",
              justifyContent: "center",
              display: "flex",
            }}
          >
            <Col
              span={4}
              style={{
                alignContent: "center",
                justifyContent: "center",
                display: "flex",
                margin: 10,
              }}
            >
              <Form.Item>
                <Button onClick={loginStore.tryLogin}>Log in</Button>
              </Form.Item>
            </Col>
          </Col>
        </Row>
      </Form>
    </div>
  );
});

export default LoginView;
