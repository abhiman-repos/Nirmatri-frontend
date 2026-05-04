const API = "http://127.0.0.1:8000/api/admin";

export const getPendingSellers = async () => {
  const res = await fetch(`${API}/pending-sellers/`);
  return res.json();
};

export const approveSeller = async (id: string) => {
  const res = await fetch(`${API}/approve/${id}/`, {
    method: "POST",
  });
  return res.json();
};

export const rejectSeller = async (id: string) => {
  const res = await fetch(`${API}/seller/reject/${id}/`, {
    method: "POST",
  });
  return res.json();
};