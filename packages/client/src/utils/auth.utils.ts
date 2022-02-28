function clearLoginLocalStorage() {
  localStorage.removeItem('rememberMe');
  localStorage.removeItem('email');
  localStorage.removeItem('password');
}

export function rememberMe(shouldRemember: boolean, email: string, password: string) {
  if (shouldRemember) {
    localStorage.setItem('rememberMe', JSON.stringify(shouldRemember));
    localStorage.setItem('email', email);
    localStorage.setItem('password', password);
  } else {
    clearLoginLocalStorage();
  }
}

export function getLocalStorageLoginItems() {
  return {
    localStorageEmail: localStorage.getItem('email'),
    localStoragePassword: localStorage.getItem('password'),
  };
}
