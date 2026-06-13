import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = document.cookie
    .split('; ')
    .find(row => row.startsWith('token='))
    ?.split('=')[1];

  console.log('🔑 Token found:', token ? 'YES' : 'NO');
  console.log('📤 Request URL:', req.url);
  console.log('📋 Auth header:', req.headers.get('Authorization'));

  if (token) {
    return next(req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    }));
  }

  return next(req);
};
