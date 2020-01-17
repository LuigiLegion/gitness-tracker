// Toast Message Generator
const toastMessageGenerator = (message, color) => {
  window.M.toast({
    html: `<span>${message}</span>`,
    classes: color,
  });
};

// Exports
export default toastMessageGenerator;
