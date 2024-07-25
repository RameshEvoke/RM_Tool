import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './ResourceAllocation.css'; // Ensure you create this CSS file for styling the modal

const PAGE_SIZE = 3;

const ResourceMapped = () => {
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const handleRowClick = (employee) => {
    setSelectedEmployee(employee);
    setShowModal(true);
  };

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filterEmployees = (employee) => {
    return employee.account_name.toLowerCase().includes(searchTerm.toLowerCase());
  };

  const employees = [
    {
      account_name: 'Venkatesh',
      id: '121',
      account_owner: 'Venkatesh',
      customer_poc: 'Venkatesh',
      status: 'in-progress',
      technologies: 'Node',
    },
  ];

  const filteredEmployees = searchTerm ? employees.filter(filterEmployees) : data.length ? data : employees;
  const totalPages = Math.ceil(filteredEmployees.length / PAGE_SIZE);
  const startIndex = currentPage * PAGE_SIZE;
  const endIndex = Math.min(startIndex + PAGE_SIZE, filteredEmployees.length);
  const currentEmployees = filteredEmployees.slice(startIndex, endIndex);

  const closeModal = () => {
    setShowModal(false);
    setSelectedEmployee(null);
  };

  return (
    <div class="table-responsive">
      <div style={{ width: '100%', paddingTop: '26px' }}>
        <table style={{ width: '100%' }} id="test-table" className="table-auto bg-white mb-4 table-bordered border-white">
          <thead className="bg-gray-50">
            <tr>
              <th className="bg-[#E8EBF9] text-slategray-100 text-left px-3 py-3 text-nowrap fw-bold text-sm">
                Resource Name
              </th>
              <th className="bg-[#E8EBF9] text-slategray-100 text-left px-3 py-3 text-nowrap fw-bold text-sm">
                Role
              </th>
              <th className="bg-[#E8EBF9] text-slategray-100 text-left px-3 py-3 text-nowrap fw-bold text-sm">
                Allocated Hours
              </th>
              <th className="bg-[#E8EBF9] text-slategray-100 text-left px-3 py-3 text-nowrap fw-bold text-sm">
                Time Reported
              </th>
              <th className="bg-[#E8EBF9] text-slategray-100 text-left px-3 py-3 text-nowrap fw-bold text-sm">
                Task Assigned
              </th>
              <th className="bg-[#E8EBF9] text-slategray-100 text-left px-3 py-3 text-nowrap fw-bold text-sm">
                Skill(s)
              </th>
              <th className="bg-[#E8EBF9] text-slategray-100 text-left px-3 py-3 text-nowrap fw-bold text-sm">
                Next Availabilty
              </th>
              <th className="bg-[#E8EBF9] text-slategray-100 text-left px-3 py-3 text-nowrap fw-bold text-sm">
                Status
              </th>
              <th className="bg-[#E8EBF9] text-slategray-100 text-left px-3 py-3 text-nowrap fw-bold text-sm">
                Rate Card
              </th>
              <th className="bg-[#E8EBF9] text-slategray-100 text-left px-3 py-3 text-nowrap fw-bold text-sm">
                Cost Per Hour
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {currentEmployees.map((employee) => (
              <tr className="cursor-pointer" key={employee.id} onClick={() => handleRowClick(employee)}>
                <td className="border border-gray-200 text-[#324ea8] text-sm px-3 py-3">
                  <b>{"Venkatesh"}</b>
                </td>
                <td className="border border-blue-200 text-[#6E7391] text-sm px-3 py-3">{"Senior Technical Associate"}</td>
                <td className="border border-gray-200 text-[#6E7391] text-sm px-3 py-3">{"20 Hours"}</td>
                <td className="border border-gray-200 text-[#6E7391] text-sm px-3 py-3">{"100 Hours"}</td>
                <td className="border border-gray-200 text-[#6E7391] text-sm px-3 py-3">{"AXL-02022020"}</td>
                <td className="border border-gray-200 text-[#6E7391] text-sm px-3 py-3">{"React"}</td>
                <td className="border border-gray-200 text-[#6E7391] text-sm px-3 py-3">{"20-Aug-2025"}</td>
                <td className="border border-gray-200 text-[#6E7391] text-sm px-3 py-3">{"Occupied"}</td>
                <td className="border border-gray-200 text-[#6E7391] text-sm px-3 py-3">{""}</td>
                <td className="border border-gray-200 text-[#6E7391] text-sm px-3 py-3">{""}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <h2>{selectedEmployee.account_name}</h2>
            <p><strong>Account Owner:</strong> {selectedEmployee.account_owner}</p>
            <p><strong>Customer POC:</strong> {selectedEmployee.customer_poc}</p>
            <p><strong>Status:</strong> {selectedEmployee.status}</p>
            <p><strong>Technologies:</strong> {selectedEmployee.technologies}</p>
          </div>
        </div>
      )}

      <div className="flex justify-end mt-4">
        <ReactPaginate
          pageCount={totalPages}
          pageRangeDisplayed={2}
          marginPagesDisplayed={1}
          onPageChange={handlePageChange}
          containerClassName="pagination"
          previousLabel={<FaChevronLeft />}
          nextLabel={<FaChevronRight />}
          breakLabel="..."
          breakClassName="break-me"
          activeClassName="active"
        />
      </div>
    </div>
  );
};

export default ResourceMapped;
