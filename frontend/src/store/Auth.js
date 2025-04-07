import axios from "axios";
import { create } from "zustand";
import { toast } from "react-hot-toast";

export const useAuthStore = create((set) => ({
  user: null,
  isSigningUp: false,
  isLoggingIn: false,
  isLoggingOut: false,
  signup: async (credentials) => {
    // Implement sign-up logic here
    set({ isSigningUp: true });
    try {
      const response = await axios.post("/api/v1/auth/signup", credentials, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        toast.success("User Created Successfully!");
        set({ isSigningUp: false });
        set({ user: response.data.user });
      } else {
        toast.error(response.data.message || "Something went wrong!");
        set({ isSigningUp: false });
        return;
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
      set({ isSigningUp: false });
    }
  },
  login: async (credentials) => {
    // Implement login logic here
    set({ isLoggingIn: true });
    try {
      const data = await axios.post("/api/v1/auth/login", credentials, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (data.status === 200) {
        toast.success(data.data.message || "User Logged In Successfully!");
        set({ user: data.data.user });
        set({ isLoggingIn: false });
      } else {
        toast.error(data.message || "Something went wrong!");
        set({ isLoggingIn: false });
        return;
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
      set({ isLoggingIn: false });
    }
  },
  logout: async () => {
    // Implement logout logic here
    set({ isLoggingOut: true });
    try {
      const data = await axios.post("/api/v1/auth/logout", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!data) {
        toast.error(data.data.message || "Something went wrong!");
        set({ isLoggingOut: false });
        return;
      }
      if (data.status === 200) {
        set({ user: null });
        toast.success("User Logged Out Successfully!");
        set({ isLoggingOut: false });
      } else {
        toast.error(data.message || "Something went wrong!");
        set({ isLoggingOut: false });
        return;
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong!");
    }
  },
  authCheck: async () => {
    // Implement authentication check logic here
    try {
       const data=await axios.get("/api/v1/auth/authcheck", {
        headers: {
          "Content-Type": "application/json",
        },
       
      });
     set ({ user: data.data.user });
    } catch (error) {
       if(error.response?.data?.includes(400)){
        toast.error(error.response?.data?.message || "Something went wrong")
       }
    }
  },
}));
