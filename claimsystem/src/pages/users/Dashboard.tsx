import { useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

import AvailablePolicies from "./AvailablePolicies";
import MyPolicies from "./MyPolicies";
import MyClaims from "./MyClaims";

import PurchasePolicy from "./PurchasePolicy";
import SubmitClaim from "./submitClaim";
import UploadClaimDocuments from "./UploadDocument";

const Dashboard = () => {
  const [activePage, setActivePage] = useState<string>("");
  const [selectedPolicyId, setSelectedPolicyId] = useState<number | null>(null);

  const renderComponent = () => {
    switch (activePage) {
      case "policies":
        return (
          <AvailablePolicies
            onPurchase={(id: number) => {
              setSelectedPolicyId(id);
              setActivePage("purchase");
            }}
          />
        );

      case "purchase":
        return selectedPolicyId ? (
          <PurchasePolicy policyId={selectedPolicyId} />
        ) : (
          <h6>No policy selected</h6>
        );

      case "mypolicies":
        return <MyPolicies />;

      case "myclaims":
        return <MyClaims />;

      case "submit":
        return <SubmitClaim />;

      case "upload":
        return <UploadClaimDocuments />;

      default:
        return <h5 className="text-muted">Select an option</h5>;
    }
  };

  return (
    <Container className="mt-4">
      <h2>User Dashboard</h2>

      {/* MENU */}
      <Row className="mt-3">
        {[
          { name: "Available Policies", key: "policies" },
          { name: "My Policies", key: "mypolicies" },
          { name: "My Claims", key: "myclaims" },
          { name: "Submit Claim", key: "submit" },
          { name: "Upload Documents", key: "upload" },
        ].map((item) => (
          <Col md={3} key={item.key} className="mb-2">
            <Button
              className="w-100"
              onClick={() => setActivePage(item.key)}
            >
              {item.name}
            </Button>
          </Col>
        ))}
      </Row>

      {/* CONTENT */}
      <div className="mt-4">
        <Card className="p-3 shadow-sm">{renderComponent()}</Card>
      </div>
    </Container>
  );
};

export default Dashboard;