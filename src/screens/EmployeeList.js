import React from "react";
import { Button, Container, Card, InputGroup, Form } from "react-bootstrap";
import CommonLayout from "../layouts";

export default function EmployeeList() {
  return (
    <CommonLayout>
      <Container>
        <Card className="p-5">
          <Card.Title>Employee List</Card.Title>
          <Card.Body>
            <Form>
              <InputGroup className="mb-3">
                <Form.Control type="file" />
                <Button variant="primary">Upload</Button>
              </InputGroup>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </CommonLayout>
  );
}
