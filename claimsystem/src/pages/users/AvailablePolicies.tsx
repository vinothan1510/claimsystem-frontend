import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { getAvailablePolicies } from "../../api/policyApi";

const AvailablePolicies = ({ onPurchase }: any) => {
  const [policies, setPolicies] = useState<any[]>([]);

  useEffect(() => {
    getAvailablePolicies().then(res => setPolicies(res.data));
  }, []);

  return (
    <Container className="mt-4">
      <h3 className="mb-4 text-center">Available Policies</h3>

      <Row>
        {policies.map((p) => (
          <Col md={4} key={p.policyId} className="mb-4">
            <Card className="shadow-lg h-100 border-0 rounded-4">
              <Card.Body>
                <Card.Title className="fw-bold text-primary">
                  {p.policyName}
                </Card.Title>

                <Card.Text>
                  <strong>Coverage:</strong> ₹ {p.coverageAmount}
                </Card.Text>

                <Card.Text>
                  <strong>Premium:</strong> ₹ {p.premiumAmount}
                </Card.Text>

                {/* Optional Description */}
                {p.description && (
                  <Card.Text className="text-muted">
                    {p.description}
                  </Card.Text>
                )}

                <div className="d-grid mt-3">
                  <Button
                    variant="success"
                    onClick={() => onPurchase(p.policyId)}
                  >
                    Purchase
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default AvailablePolicies;