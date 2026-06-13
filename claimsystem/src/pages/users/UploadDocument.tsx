import { useState } from "react";
import { uploadClaimDocument } from "../../api/claimApi";

const UploadClaimDocuments = () => {
  const [claimId, setClaimId] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [msg, setMsg] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    try {
      await uploadClaimDocument(Number(claimId), file);
      setMsg("Document uploaded successfully");
    } catch {
      setMsg("Upload failed");
    }
  };

  return (
    <div className="container mt-4">
      <h4>Upload Claim Document (PDF)</h4>

      {msg && <div className="alert alert-info">{msg}</div>}

      <form onSubmit={submit}>
        <input
          className="form-control mb-2"
          placeholder="Claim ID"
          value={claimId}
          onChange={e => setClaimId(e.target.value)}
          required
        />

        <input
          type="file"
          accept="application/pdf"
          className="form-control mb-3"
          onChange={e => setFile(e.target.files?.[0] || null)}
          required
        />

        <button className="btn btn-primary">
          Upload PDF
        </button>
      </form>
    </div>
  );
};

export default UploadClaimDocuments;
