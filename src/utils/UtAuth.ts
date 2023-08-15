const UtAuth = {
  getCookie(name: string) {
    //console.log('getCookie ' + name);
    const cookieArray = document.cookie.split(';');
    //console.log(cookieArray);
    for (let i = 0; i < cookieArray.length; i++) {
      let cookie = cookieArray[i];
      //console.log(cookie);
      while (cookie.charAt(0) === ' ') {
        cookie = cookie.substring(1);
      }
      if (cookie.indexOf(name) === 0) {
        return cookie.substring(name.length + 1, cookie.length);
      }
    }
    return '';
  },
  logout() {
    const cookies = document.cookie.split(';');

    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf('=');
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    }

    localStorage.clear();
    
    if (process.env.REACT_APP_ENV === 'dev') {
      console.log('fetch logout');
      fetch('/logout');
    } else {
      window.location.href = '/logout';
    }
  },
  signup() {

    if (process.env.REACT_APP_ENV === 'dev') {
      console.log('fetch signup');
      fetch('/login');
    } else {
      window.location.href = '/signup';
    }
  },
  login() {

    if (process.env.REACT_APP_ENV === 'dev') {
      console.log('fetch login');
      fetch('/login');
    } else {
      window.location.href = '/login';
    }
  },
  apiDoc() {
    window.open('/api-doc', '_blank');
  },
  async commonFetch(endpoint : string, options?: RequestInit | null) {
    const response = await fetch(endpoint, options || undefined);
    if (response.status === 401) {
      if (window.location.pathname !== '/home') {
        window.location.href = '/home';
      }
      return null; 
    }
    return response;
  },
};
export default UtAuth;