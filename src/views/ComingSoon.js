import React from "react";
import {Container, Input, FormGroup, Button} from "reactstrap";

export default function ComingSoon() {
  return (
    <div className="content">
      <Container
        fluid
        className="d-flex justify-content-center align-items-center flex-column"
        style={{
          height: "60vh",
        }}
      >
        <h2
          className="title align-center"
          style={{
            marginBottom: "0.4rem",
          }}
        >
          Coming Soon
        </h2>
        <p className="d-block text-center">
          We will email you when it's ready 😄
        </p>
        <FormGroup
          style={{
            minWidth: "20rem",
          }}
        >
          <Input
            className="mt-2"
            placeholder="example@email.com"
            type="email"
          />
          <Button className="w-100 mt-2" type="submit" color="success">
            Subscribe
          </Button>
        </FormGroup>
      </Container>
    </div>
  );
}
