const AdminPage = ({ title, description }) => {
  return (
    <div>
      <h1 className="text-xl font-bold text-gray-800">
        {title}
      </h1>

      <p className="mt-1 text-xs text-gray-500">
        {description}
      </p>

      <div className="mt-6 rounded-lg border border-dashed border-gray-300 bg-white p-8 text-center">
        <p className="text-sm font-semibold text-gray-600">
          {title} Management
        </p>

        <p className="mt-1 text-xs text-gray-400">
          This section will be connected to the backend.
        </p>
      </div>
    </div>
  );
};

export default AdminPage;