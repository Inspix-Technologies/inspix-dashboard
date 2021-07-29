import { useApiKeys } from "providers/APIKeyProvider";
import React from "react";
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Table,
  Button,
} from "reactstrap";

export default function APIKeys() {
  const { apiKeys, createAPIKey, invalidateAPIKey } = useApiKeys();

  return (
    <div className="content">
      <Row>
        <Col xs={12}>
          <Card>
            <CardHeader>
              <h2 className="title">API Keys</h2>
            </CardHeader>
            <CardBody>
              <Table className="tablesorter">
                <thead className="text-primary">
                  <tr>
                    <th>API Key</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {apiKeys.map((key) => (
                    <tr>
                      <td style={{ maxWidth: "10rem" }}>{key}</td>
                      <td>
                        <Button
                          className="btn-link p-0"
                          color="danger"
                          onClick={invalidateAPIKey(key)}
                        >
                          Invalidate
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Button color="primary" onClick={createAPIKey}>
                New API Key
              </Button>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
