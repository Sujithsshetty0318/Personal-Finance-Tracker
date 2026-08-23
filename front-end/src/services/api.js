import axios from "axios";

const API_URL = "http://localhost:8081/api/expenses";

const getCurrentUserId = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user ? user.id : null;
};

export const getExpenses = async (startDate, endDate) => {
  try {
    const userId = getCurrentUserId();
    const response = await axios.get(API_URL, {
      params: { startDate, endDate, userId },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching expenses:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export const addExpense = async (expense) => {
  try {
    const userId = getCurrentUserId();
    const expenseWithUser = { ...expense, userId };
    const response = await axios.post(API_URL, expenseWithUser);
    return response.data;
  } catch (error) {
    console.error(
      "Error adding expense:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export const updateExpense = async (id, updatedExpense) => {
  try {
    const userId = getCurrentUserId();
    const response = await axios.put(`${API_URL}/${id}`, updatedExpense, {
      params: { userId },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error updating expense:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export const deleteExpense = async (id) => {
  try {
    const userId = getCurrentUserId();
    const response = await axios.delete(`${API_URL}/${id}`, {
      params: { userId },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error deleting expense:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export const signup = async (username, password, name) => {
  try {
    const response = await axios.post("http://localhost:8081/api/auth/signup", {
      username,
      password,
      name,
    });
    return response.data;
  } catch (error) {
    console.error("Signup error:", error.response ? error.response.data : error.message);
    throw error;
  }
};

export const login = async (username, password) => {
  try {
    const response = await axios.post("http://localhost:8081/api/auth/login", {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Login error:", error.response ? error.response.data : error.message);
    throw error;
  }
};
