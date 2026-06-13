import { useEffect, useState } from "react";
import { Table, Container, Badge } from "react-bootstrap";
import { getActivePolicies } from "../../api/userPolicyApi";



const MyPolicies = () => {
  const [policies, setPolicies] = useState<any[]>([]);
  const userId = Number(localStorage.getItem("userId"));

  console.log(userId);

  useEffect(() => {
    getActivePolicies(userId).then(res => setPolicies(res.data));
  }, []);

  return (
    <Container className="mt-4">
      <h3>My Policies</h3>

      <Table bordered>
        <thead className="table-dark">
          <tr>
            <th>Policy Name</th>
            <th>Expiry Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {policies.map(p => (
            <tr key={p.userPolicyId}>
              <td>{p.policyName}</td>
              <td>{p.expiryDate}</td>
              <td>
                {p.isActive ? (
                  <Badge bg="success">Active</Badge>
                ) : (
                  <Badge bg="danger">Inactive</Badge>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default MyPolicies;

