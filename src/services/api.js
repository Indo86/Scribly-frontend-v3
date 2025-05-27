import axios from "axios";


const API_URL = "https://scribly-backend-v3-559917148272.us-central1.run.app/api";

const apiInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

// Set token awal (saat reload page)
const token = localStorage.getItem("accessToken");
if (token) {
  apiInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

// Interceptor REQUEST — Selalu kirim token
apiInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor RESPONSE — Handle token expired
apiInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401 && error.response.data?.error === "Invalid or expired token") {
      try {
        const res = await axios.get(`${API_URL}/token/refresh`, { withCredentials: true });
        const newAccessToken = res.data.accessToken;

        localStorage.setItem("accessToken", newAccessToken);
        apiInstance.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`;
        error.config.headers["Authorization"] = `Bearer ${newAccessToken}`;

        return apiInstance(error.config); // ulangi request
      } catch (refreshErr) {
        console.error("Refresh token gagal", refreshErr);
        localStorage.removeItem("accessToken");
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

const api = {
  async login(userData) {
    const res = await apiInstance.post("/user/login", userData);
    const accessToken = res.data.accessToken;
    localStorage.setItem("accessToken", accessToken);
    apiInstance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    return res;
  },

  async logout() {
    const res = await apiInstance.post("/user/logout");
    localStorage.removeItem("accessToken");
    delete apiInstance.defaults.headers.common["Authorization"];
    window.location.href = "/login";
    return res;
  },

  async register(userData) {
    return apiInstance.post("/user/register", userData);
  },

  getProfile() {
    return apiInstance.get("/user/profile");
  },

  updatePassword(oldPassword, newPassword) {
    return apiInstance.put("/user/profile/password", { oldPassword, newPassword });
  },

  updateProfile(data) {
    return apiInstance.put("/user/profile", data);
  },

  getTodos() {
    return apiInstance.get("/todos");
  },

  addTodo(todo) {
    return apiInstance.post("/todos", todo);
  },

  deleteTodo(id) {
    return apiInstance.delete(`/todos/${id}`);
  },

  updateTodo(id, updatedData) {
    return apiInstance.put(`/todos/${id}`, updatedData);
  },

  getNotes() {
    return apiInstance.get("/notes");
  },

  addNote(note) {
    return apiInstance.post("/notes", note);
  },

  deleteNote(id) {
    return apiInstance.delete(`/notes/${id}`);
  },

  updateNote(id, updatedData) {
    return apiInstance.put(`/notes/${id}`, updatedData);
  },
};

export default api;
