import api from "../../services/api";

// Get inquiries with optional filters
export const getInquiries = async (params = {}) => {
  const response = await api.get("/admin/inquiries", {
    params,
  });

  return response.data;
};

// Get single inquiry details
export const getInquiry = async (id) => {
  const response = await api.get(`/admin/inquiries/${id}`);

  return response.data;
};

// Update inquiry status
export const updateInquiryStatus = async (id, status) => {
  const response = await api.patch(`/admin/inquiries/${id}`, {
    status,
  });

  return response.data;
};

// Delete inquiry
export const deleteInquiry = async (id) => {
  const response = await api.delete(`/admin/inquiries/${id}`);

  return response.data;
};