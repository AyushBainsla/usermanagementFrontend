import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { getUsersList } from "@/stores/actions/user";

const initialUsers = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com", status: "Pending", date: "2024-11-01" },
  { id: 2, name: "Bob Smith", email: "bob@example.com", status: "In Progress", date: "2024-11-02" },
  { id: 3, name: "Charlie Brown", email: "charlie@example.com", status: "Completed", date: "2024-11-03" },
  { id: 4, name: "David Lee", email: "david@example.com", status: "Pending", date: "2024-11-04" },
  { id: 5, name: "Eva Green", email: "eva@example.com", status: "In Progress", date: "2024-11-05" },
  { id: 6, name: "Frank White", email: "frank@example.com", status: "Completed", date: "2024-11-06" },
  { id: 7, name: "Grace Black", email: "grace@example.com", status: "Pending", date: "2024-11-07" },
  { id: 8, name: "Hannah Adams", email: "hannah@example.com", status: "In Progress", date: "2024-11-08" },
  { id: 9, name: "Ivy Stone", email: "ivy@example.com", status: "Completed", date: "2024-11-09" },
  { id: 10, name: "Jack Hill", email: "jack@example.com", status: "Pending", date: "2024-11-10" },
];

const columns = [
  { label: "Name", key: "name", align: "left" },
  { label: "Email", key: "email", align: "left" },
  { label: "Status", key: "status", align: "left" },
  { label: "Dob", key: "date", align: "left" },
  { label: "Actions", key: "actions", align: "center" },
];

export default function UserList() {
  const [users, setUsers] = useState(initialUsers);
  const [filter, setFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [nameSortOrder, setNameSortOrder] = useState("asc");
  const [dateSortOrder, setDateSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const dispatch = useDispatch();
  const {loading, usersList} = useSelector((Gstate) => Gstate.user);
  console.log("users list ==>", usersList);
  const router = useRouter();

  const handleEdit = (userId) => {
    const user = users.find((user) => user.id === userId);
    if (user) {
      router.push(`/candidate/edit/${user.id}`);
    }
  };

  useEffect(() => {
    dispatch(getUsersList());
  }, [])

  const handleAddNewCandidate = () => {
    router.push('/candidate/create');
  };

  const handleFilterChange = (e) => setFilter(e.target.value);

  const handleStatusFilterChange = (e) => setStatusFilter(e.target.value);

  const handleNameSort = () => {
    const order = nameSortOrder === "asc" ? "desc" : "asc";
    setNameSortOrder(order);
    setUsers((prevUsers) =>
      [...prevUsers].sort((a, b) =>
        order === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
      )
    );
  };

  const handleDateSort = () => {
    const order = dateSortOrder === "asc" ? "desc" : "asc";
    setDateSortOrder(order);
    setUsers((prevUsers) =>
      [...prevUsers].sort((a, b) =>
        order === "asc" ? new Date(a.date) - new Date(b.date) : new Date(b.date) - new Date(a.date)
      )
    );
  };

  const handleStatusChange = (id, newStatus) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id ? { ...user, status: newStatus } : user
      )
    );
  };

  const filteredUsers = users.filter(
    (user) =>
      (user.name.toLowerCase().includes(filter.toLowerCase()) ||
      user.date.includes(filter)) &&
      (statusFilter ? user.status === statusFilter : true)
  );

  const indexOfLastUser = currentPage * rowsPerPage;
  const indexOfFirstUser = indexOfLastUser - rowsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(e.target.value);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);

  return (
    <div className="container my-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <p className="fs-5">User List</p>
        <Button onClick={handleAddNewCandidate} className="rounded text-white">
          Add New Candidate
        </Button>
      </div>

      <div className="mb-3 d-flex gap-2">
        <input
          type="text"
          className="form-control"
          placeholder="Filter by name or date"
          value={filter}
          onChange={handleFilterChange}
        />
        <select
          className="form-select"
          value={statusFilter}
          onChange={handleStatusFilterChange}
        >
          <option value="">Filter by Status</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      <Card className="card shadow mb-4">
        <div className="table-responsive">
          <Table className="table table-hover align-middle mb-0">
            {/* <TableHead> */}
              <TableRow className="bg-light">
                {columns.map((column) => (
                  <TableCell
                    key={column.key}
                    className={`fw-semibold text-dark py-2 px-4 ${column.align === "center" ? "text-center" : ""}`}
                    onClick={() => {
                      if (column.key === "name") handleNameSort();
                      if (column.key === "date") handleDateSort();
                    }}
                    style={{ cursor: column.key !== "actions" ? "pointer" : "default" }}
                  >
                    {column.label}
                    {column.key === "name" && (
                      <span className="py-0 bg-transparent px-1 border-0">{nameSortOrder === "asc" ? " ↑" : " ↓"}</span>
                    )}
                    {column.key === "date" && (
                      <span className="py-0 bg-transparent px-1 border-0">{dateSortOrder === "asc" ? " ↑" : " ↓"}</span>
                    )}
                  </TableCell>
                ))}
              </TableRow>
            {/* </TableHead> */}
            <TableBody>
              {currentUsers.map((user) => (
                <TableRow key={user.id} className="border-bottom">
                  {columns.map((column) => (
                    <TableCell
                      key={column.key}
                      className={`py-3 px-4 ${column.align === "center" ? "text-center" : ""}`}
                    >
                      {column.key === "name" && (
                        <div className="d-flex align-items-center">
                          <Avatar className="me-2" />
                          <span className="fw-bold text-dark">{user.name}</span>
                        </div>
                      )}
                      {column.key === "email" && (
                        <span className="text-secondary">{user.email}</span>
                      )}
                      {column.key === "status" && (
                        <select
                          className={`form-select ${user.status === "Completed"
                            ? "bg-success text-white"
                            : user.status === "In Progress"
                            ? "bg-warning text-dark"
                            : "bg-secondary text-white"}`}
                          value={user.status}
                          onChange={(e) => handleStatusChange(user.id, e.target.value)}
                        >
                          <option value="Pending">Pending</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Completed">Completed</option>
                        </select>
                      )}
                      {column.key === "date" && (
                        <span className="text-muted">{user.date}</span>
                      )}
                      {column.key === "actions" && (
                        <Button
                          size="sm"
                          className="bg-primary text-white"
                          onClick={() => handleEdit(user.id)}
                        >
                          Edit
                        </Button>
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      <div className="d-flex justify-content-between align-items-center mt-4">
        <div>
          <p className="text-muted">
            Showing {indexOfFirstUser + 1} to {indexOfLastUser} of {filteredUsers.length} users
          </p>
        </div>

        <div className="d-flex gap-2">
          <select
            className="form-select"
            value={rowsPerPage}
            onChange={handleRowsPerPageChange}
          >
            <option value="5">5 rows per page</option>
            <option value="10">10 rows per page</option>
            <option value="20">20 rows per page</option>
          </select>
          <div>
            <nav aria-label="Pagination">
              <ul className="pagination">
                <li className="page-item">
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>
                </li>
                {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                  <li key={page} className={`page-item ${page === currentPage ? "active" : ""}`}>
                    <button
                      className="page-link"
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </button>
                  </li>
                ))}
                <li className="page-item">
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
