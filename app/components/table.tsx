"use client";
import React, { useState } from "react";

interface DataRow {
  id: number;
  name: string;
  gender: string;
  mobilePhone: string;
  nationality: string;
}

const initialData: DataRow[] = [
  {
    id: 1,
    name: "John Doe",
    gender: "Male",
    mobilePhone: "123-456-7890",
    nationality: "American",
  },
  {
    id: 2,
    name: "Jane Smith",
    gender: "Female",
    mobilePhone: "234-567-8901",
    nationality: "British",
  },
  // Add more data as needed
];

type SortOrder = "asc" | "desc";

const DataTable: React.FC = () => {
  const [data, setData] = useState<DataRow[]>(initialData);
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  const [sortConfig, setSortConfig] = useState<{
    key: keyof DataRow;
    order: SortOrder;
  } | null>(null);

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const allIds = data.map((row) => row.id);
      setSelectedRows(new Set(allIds));
    } else {
      setSelectedRows(new Set());
    }
  };

  const handleSelectRow = (id: number) => {
    const newSelectedRows = new Set(selectedRows);
    if (newSelectedRows.has(id)) {
      newSelectedRows.delete(id);
    } else {
      newSelectedRows.add(id);
    }
    setSelectedRows(newSelectedRows);
  };

  const handleSort = (key: keyof DataRow) => {
    let order: SortOrder = "asc";
    if (sortConfig && sortConfig.key === key && sortConfig.order === "asc") {
      order = "desc";
    }

    const sortedData = [...data].sort((a, b) => {
      if (a[key] < b[key]) {
        return order === "asc" ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return order === "asc" ? 1 : -1;
      }
      return 0;
    });

    setSortConfig({ key, order });
    setData(sortedData);
  };

  const renderSortIndicator = (key: keyof DataRow) => {
    if (!sortConfig || sortConfig.key !== key) {
      return null;
    }
    return sortConfig.order === "asc" ? "▲" : "▼";
  };

  return (
    <div className="container mx-auto p-4">
      <div className="overflow-x-auto bg-white shadow-md rounded">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-4">
                <input
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={selectedRows.size === data.length}
                />
              </th>
              <th
                className="py-2 px-4 cursor-pointer"
                onClick={() => handleSort("name")}
              >
                Name {renderSortIndicator("name")}
              </th>
              <th
                className="py-2 px-4 cursor-pointer"
                onClick={() => handleSort("gender")}
              >
                Gender {renderSortIndicator("gender")}
              </th>
              <th
                className="py-2 px-4 cursor-pointer"
                onClick={() => handleSort("mobilePhone")}
              >
                Mobile Phone {renderSortIndicator("mobilePhone")}
              </th>
              <th
                className="py-2 px-4 cursor-pointer"
                onClick={() => handleSort("nationality")}
              >
                Nationality {renderSortIndicator("nationality")}
              </th>
              <th className="py-2 px-4">Manage</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.id} className="text-center border-b">
                <td className="py-2 px-4">
                  <input
                    type="checkbox"
                    checked={selectedRows.has(row.id)}
                    onChange={() => handleSelectRow(row.id)}
                  />
                </td>
                <td className="py-2 px-4">{row.name}</td>
                <td className="py-2 px-4">{row.gender}</td>
                <td className="py-2 px-4">{row.mobilePhone}</td>
                <td className="py-2 px-4">{row.nationality}</td>
                <td className="py-2 px-4">
                  <button className="px-4 py-2 bg-blue-500 text-white rounded">
                    Manage
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
