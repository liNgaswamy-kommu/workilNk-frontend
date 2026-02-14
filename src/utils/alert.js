import Swal from "sweetalert2";

/* ================= BASE TOAST ================= */
const baseToast = {
  toast: true,
  position: "top",
  showConfirmButton: false,
  timer: 1200,
  timerProgressBar: true,
  background: "#111",
  color: "#fff",
  customClass: {
    popup: "form-toast"
  }
};

/* ================= FORM ================= */
export const formSuccess = (message) => {
  Swal.fire({
    ...baseToast,
    icon: "success",
    title: message,
    iconColor: "#22c55e"
  });
};

export const formError = (message) => {
  Swal.fire({
    ...baseToast,
    icon: "error",
    title: message,
    iconColor: "#ef4444"
  });
};

/* ================= LOGOUT CONFIRM ================= */
export const confirmLogout = async () => {
  const res = await Swal.fire({
    title: "Logout?",
    text: "You will be logged out of WorkiLnk",
    icon: "warning",
    background: "#111",
    color: "#fff",
    showCancelButton: true,
    confirmButtonText: "Yes, Logout",
    cancelButtonText: "Cancel",
    confirmButtonColor: "#dc2626",
    cancelButtonColor: "#374151"
  });

  return res.isConfirmed;
};

/* ================= DELETE CONFIRM ================= */

export const confirmDelete = async () => {
  const result = await Swal.fire({
    title: "Delete this task?",
    text: "This action cannot be undone",
    icon: "warning",
    showCancelButton: true,

    confirmButtonText: "Yes, delete",
    cancelButtonText: "Cancel",

    reverseButtons: true,

    confirmButtonColor: "#dc2626", // 🔴 red
    cancelButtonColor: "#0bfa03",  

    focusCancel: true,
  });

  return result.isConfirmed;
};


/* aliases */
export const toastSuccess = formSuccess;
export const toastError = formError;


