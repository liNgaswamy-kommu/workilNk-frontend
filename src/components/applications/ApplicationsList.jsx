import "./ApplicationsList.css";

function ApplicationsList({ applications, onAccept, onReject, task }) {
  if (!applications || applications.length === 0) {
    return <p className="no-apps">No applications yet</p>;
  }

  // 🔥 check if someone already accepted
  const alreadyAccepted = applications.some(
    (a) => a.status === "ACCEPTED"
  );

  return (
    <div className="applications-list">
      {applications.map((app) => (
        <div className="application-card" key={app.applicationId}>

          {/* HEADER */}
          <div className="app-header">
            <div>
              <h4 className="worker-name">Applicant Name: {app.workerName}</h4>
              <p className="bid">Bid: ₹{app.bidAmount}</p>
            </div>

            {/* RIGHT SIDE */}
            <div className="app-right">
              <span className={`status-badge ${app.status.toLowerCase()}`}>
                {app.status}
              </span>

              {/* SMALL ACTION BUTTONS */}
              {app.status === "APPLIED" && !alreadyAccepted && (
                <div className="mini-actions">
                  <button
                    className="mini-accept"
                    onClick={() => onAccept(task.id, app.applicationId)}
                  >
                    Accept
                  </button>
                  <button
                    className="mini-reject"
                    onClick={() => onReject(app.applicationId)}
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* MESSAGE */}
          <p className="message">Message: "{app.message}"</p>
        </div>
      ))}
    </div>
  );
}

export default ApplicationsList;
