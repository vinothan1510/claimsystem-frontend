import { useEffect, useState } from "react";
import { Container, Form, Button } from "react-bootstrap";

import { submitClaim } from "../../api/claimApi";
import { getActivePolicies } from "../../api/userPolicyApi";

const SubmitClaim = () => {
  const userId = Number(localStorage.getItem("userId"));
  const [policies, setPolicies] = useState<any[]>([]);
  const [userPolicyId, setUserPolicyId] = useState("");
  const [claimAmount, setClaimAmount] = useState("");
  const [claimReason, setClaimReason] = useState("");

  useEffect(() => {
    getActivePolicies(userId).then(res => setPolicies(res.data));
  }, []);

  const handleSubmit = async () => {
    await submitClaim(userId, {
      userPolicyId,
      claimAmount,
      claimReason
    });
    alert("Claim submitted");
  };

  return (
    <Container className="mt-4 col-md-5">
      <h4>Submit Claim</h4>

      <Form>
        <Form.Select className="mb-3" onChange={e => setUserPolicyId(e.target.value)}>
          <option>Select Policy</option>
          {policies.map(p => (
            <option key={p.userPolicyId} value={p.userPolicyId}>
              {p.policyName}
            </option>
          ))}
        </Form.Select>

        <Form.Control
          className="mb-3"
          placeholder="Claim Amount"
          onChange={e => setClaimAmount(e.target.value)}
        />

        <Form.Control
          className="mb-3"
          placeholder="Reason"
          onChange={e => setClaimReason(e.target.value)}
        />

        <Button onClick={handleSubmit}>Submit Claim</Button>
      </Form>
    </Container>
  );
};

export default SubmitClaim;
