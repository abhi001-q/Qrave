import { toast } from 'react-toastify';

const originalSuccess = toast.success;
const originalError = toast.error;
const originalInfo = toast.info;
const originalWarning = toast.warning;

toast.success = (...args) => {
  window.dispatchEvent(new CustomEvent('global-toast', { detail: { type: 'success', message: args[0], id: Date.now() } }));
  return originalSuccess(...args);
};

toast.error = (...args) => {
  window.dispatchEvent(new CustomEvent('global-toast', { detail: { type: 'error', message: args[0], id: Date.now() } }));
  return originalError(...args);
};

toast.info = (...args) => {
  window.dispatchEvent(new CustomEvent('global-toast', { detail: { type: 'info', message: args[0], id: Date.now() } }));
  return originalInfo(...args);
};

toast.warning = (...args) => {
  window.dispatchEvent(new CustomEvent('global-toast', { detail: { type: 'warning', message: args[0], id: Date.now() } }));
  return originalWarning(...args);
};
