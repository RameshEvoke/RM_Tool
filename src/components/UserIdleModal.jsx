//Idle time modal
const UserIdleModal = ({ show, onClose, onStay, onSignOut }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-md mx-auto z-10">
        <div className="px-3 py-2 header-bg">
          <h5 className="mb-0 font-semibold">Alert</h5>
         
        </div>
        <div className="p-3">
          <p>You have been inactive for a while. Do you want to stay signed in?</p>
        </div>
        <div className="flex justify-end p-2 border-t">
          <button
            className="btn-width btn btn-primary me-2"
            onClick={onStay}
          >
            Stay
          </button>
          <button
            className="btn btn-secondary btn-width"
            onClick={onSignOut}
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserIdleModal;
