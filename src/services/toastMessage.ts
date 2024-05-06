export default function displayToast(message: string): void {
  const toastElement = document.getElementById('snackbar');
  if (toastElement) {
    toastElement.textContent = message;
    toastElement.className = 'show';
    setTimeout(() => {
      toastElement.className = toastElement.className.replace('show', '');
    }, 10000);
  } else {
    console.error("Element with ID 'snackbar' not found.");
  }
}
