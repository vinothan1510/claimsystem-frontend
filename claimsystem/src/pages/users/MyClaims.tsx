import { useEffect, useState } from "react";
import { Table, Container, Badge } from "react-bootstrap";
import { getMyClaims } from "../../api/claimApi";

const MyClaims = () => {
  const userId = Number(localStorage.getItem("userId"));
  const [claims, setClaims] = useState<any[]>([]);

  useEffect(() => {
    getMyClaims(userId)
      .then(res => setClaims(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <Container>
      <h3>My Claims</h3>

      <Table bordered>
        <thead className="table-dark">
          <tr>
            ✅ <th>Claim ID</th>
            <th>Amount</th>
            <th>Reason</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {claims.map((c) => (
            <tr key={c.claimId}>
              ✅ <td>{c.claimId}</td>
              <td>₹ {c.claimAmount}</td>
              <td>{c.claimReason}</td>
              <td>
                <Badge
                  bg={
                    c.claimStatus === "APPROVED"
                      ? "success"
                      : c.claimStatus === "REJECTED"
                      ? "danger"
                      : "warning"
                  }
                >
                  {c.claimStatus}
                </Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default MyClaims;