//Idle time modal
const UserIdleModal = ({ show, onClose, onStay, onSignOut }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-md mx-auto z-10">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-semibold">Alert</h3>
         
        </div>
        <div className="p-4">
          <p>You have been inactive for a while. Do you want to stay signed in?</p>
        </div>
        <div className="flex justify-end p-4 border-t">
          <button
            className="bg-blue-500  text-white px-4 py-2 rounded mr-2 hover:bg-blue-900"
            onClick={onStay}
          >
            Stay
          </button>
          <button
            className="bg-lategray-100 text-black px-4 py-2 rounded mr-2 hover:bg-lategray-200"
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
