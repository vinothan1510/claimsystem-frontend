

import { useEffect, useState } from "react";
import { Container, Table, Button, Row, Col, Card, Form } from "react-bootstrap";
import {
  getAllClaims,
  approveClaim,
  rejectClaim,
  downloadDocument
} from "../../api/claimApi";

const claimOfficerDashboard = () => {
  const [claims, setClaims] = useState<any[]>([]);
  const [selectedDocId, setSelectedDocId] = useState("");

  // ✅ Load all claims
  const loadClaims = async () => {
    const res = await getAllClaims();
    console.log(res.data);
    setClaims(res.data);
  };

  useEffect(() => {
    loadClaims();
  }, []);

  // ✅ Approve
  const handleApprove = async (id: number) => {
    await approveClaim(id);
    alert("Claim Approved");
    loadClaims(); // refresh without reload
  };

  // ✅ Reject
  const handleReject = async (id: number) => {
    const remarks = prompt("Enter rejection remarks");
    if (remarks) {
      await rejectClaim(id, remarks);
      alert("Claim Rejected");
      loadClaims();
    }
  };

  // ✅ Download document
  const handleDownload = async () => {
    if (!selectedDocId) return;

    const res = await downloadDocument(Number(selectedDocId));

    const blob = new Blob([res.data], {
      type: "application/pdf",
    });

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "claim-document.pdf";
    a.click();
  };

  return (
    <Container className="mt-4">
      <h2>Claim Officer Dashboard</h2>

      {/* ✅ DOCUMENT DOWNLOAD SECTION */}
      <Card className="p-3 mb-4 shadow-sm">
        <h5>Download Claim Document</h5>

        <Row>
          <Col md={4}>
            <Form.Control
              placeholder="Enter Document ID"
              value={selectedDocId}
              onChange={(e) => setSelectedDocId(e.target.value)}
            />
          </Col>

          <Col>
            <Button variant="success" onClick={handleDownload}>
              Download PDF
            </Button>
          </Col>
        </Row>
      </Card>

      {/* ✅ CLAIM TABLE */}
      <Card className="p-3 shadow-sm">
        <h5>All Claims</h5>

        <Table bordered hover>
          <thead className="table-dark">
            <tr>
              <th>Claim ID</th>
              {/* <th>User ID</th> */}
              <th>Amount</th>
              <th>Reason</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {claims.map((c) => (
              <tr key={c.claimId}>
                <td>{c.claimId}</td>
                {/* <td>{c.userId}</td> */}
                <td>₹ {c.claimAmount}</td>
                <td>{c.claimReason}</td>
                <td>
                  {c.claimStatus === "APPROVED" ? (
                    <span className="text-success">APPROVED</span>
                  ) : c.claimStatus === "REJECTED" ? (
                    <span className="text-danger">REJECTED</span>
                  ) : (
                    <span className="text-warning">PENDING</span>
                  )}
                </td>
                <td>
                  <Button
                    size="sm"
                    variant="success"
                    className="me-2"
                    onClick={() => handleApprove(c.claimId)}
                  >
                    Approve
                  </Button>

                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => handleReject(c.claimId)}
                  >
                    Reject
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </Container>
  )
};

export default claimOfficerDashboard;