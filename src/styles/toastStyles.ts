import styled, { createGlobalStyle } from "styled-components";
import { ToastContainer } from "react-toastify";

export const CustomToastContainer = styled(ToastContainer)`
  margin-left: 50px;
`;

export const ToastStyle = createGlobalStyle`
  .custom-toast {
    width: 180px !important;
    min-width: unset !important;
    max-width: 180px !important;
    padding: 6px 10px !important;
    font-size: 13px !important;
    border-radius: 5px !important;
    background-color: white !important;
    color: black !important;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;

    .Toastify__toast-icon {
      width: 16px !important;
      height: 16px !important;
      margin-right: 6px !important;
    }

    .Toastify__progress-bar {
      height: 3px !important;
    }
  }
`;
