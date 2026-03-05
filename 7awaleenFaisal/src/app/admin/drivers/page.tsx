"use client";

import React, { useEffect, useState } from "react";
import { Check, X } from "lucide-react";
import ProtectedComponent from "@/app/context/Protected";
import { toast } from "react-hot-toast";
import {
  useGetDriversQuery,
  useUpdateDriverStatusMutation,
} from "@/redux/features/Api.slice";

const AdminDriversPage: React.FC = () => {
  const [processingId, setProcessingId] = useState<string | null>(null);

  const { data: drivers, isLoading, error } = useGetDriversQuery();
  const [updateDriverStatus] = useUpdateDriverStatusMutation();

  const handleAction = (
    driverId: string,
    status: "APPROVE" | "REJECT" | "SUSPEND",
  ) => {
    updateDriverStatus({ driverId, status })
      .unwrap()
      .then(() => {
        toast.success(`Driver ${status.toLowerCase()}d successfully`);
      })
      .catch((err: any) => {
        toast.error(err || "Failed to update driver");
      })
      .finally(() => {
        setProcessingId(null);
      });
  };

  if (isLoading) return <div className="p-4">Loading drivers...</div>;
  if (error)
    return <div className="p-4 text-red-500">Failed to load drivers.</div>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Driver Verification Queue</h1>
      <p className="mb-6">Pending applications: {drivers.length}</p>
      {drivers?.length === 0 ? (
        <div className="text-gray-600">No pending driver applications.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white dark:bg-dark-2 rounded-lg shadow">
            <thead className="bg-gray-100 dark:bg-dark-3">
              <tr>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Phone</th>
                <th className="px-4 py-2 text-left">Documents</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {drivers?.map((driver) => (
                <tr key={driver._id} className="border-t">
                  <td className="px-4 py-2">{driver.name}</td>
                  <td className="px-4 py-2">{driver.email}</td>
                  <td className="px-4 py-2">{driver.phone || "-"}</td>
                  <td className="px-4 py-2 space-x-2">
                    {driver.documents?.idCardUrl && (
                      <a
                        href={driver.documents.idCardUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        ID Card
                      </a>
                    )}
                    {driver.documents?.licenseUrl && (
                      <a
                        href={driver.documents.licenseUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        License
                      </a>
                    )}
                  </td>
                  <td className="px-4 py-2">
                    <span
                      className={
                        driver.accountStatus === "PENDING"
                          ? "bg-yellow-200 text-yellow-800 px-2 py-1 rounded"
                          : driver.accountStatus === "APPROVED"
                            ? "bg-green-200 text-green-800 px-2 py-1 rounded"
                            : "bg-red-200 text-red-800 px-2 py-1 rounded"
                      }
                    >
                      {driver.accountStatus}
                    </span>
                  </td>
                  <td className="px-4 py-2 space-x-2">
                    <button
                      disabled={processingId === driver._id}
                      onClick={() => handleAction(driver._id, "APPROVE")}
                      className="p-1 text-green-600 hover:text-green-800"
                    >
                      <Check size={18} />
                    </button>
                    <button
                      disabled={processingId === driver._id}
                      onClick={() => handleAction(driver._id, "REJECT")}
                      className="p-1 text-red-600 hover:text-red-800"
                    >
                      <X size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminDriversPage;
