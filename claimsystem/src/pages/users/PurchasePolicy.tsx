import { useState } from "react";
import { Container, Button, Form } from "react-bootstrap";
import { purchasePolicy } from "../../api/policyApi";

const PurchasePolicy = ({ policyId }: any) => {
  const userId = Number(localStorage.getItem("userId"));
  const [expiryDate, setExpiryDate] = useState("");

  const handlePurchase = async () => {
    await purchasePolicy(userId, {
      policyId: Number(policyId),
      expiryDate
    });

    alert("Policy purchased successfully");
  };

  return (
    <Container>
      <h4>Purchase Policy (ID: {policyId})</h4>

      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Expiry Date</Form.Label>
          <Form.Control
            type="date"
            onChange={(e) => setExpiryDate(e.target.value)}
          />
        </Form.Group>

        <Button onClick={handlePurchase}>
          Confirm Purchase
        </Button>
      </Form>
    </Container>
  );
};

export default PurchasePolicy;
