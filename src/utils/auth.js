
export function isLogin() {
	return localStorage.getItem('isLogin') === 'true';
}

export function handleLogin(data) {
	localStorage.setItem('isLogin', true);
	window.location.reload();
}

export function handleLogout() {
	localStorage.setItem('isLogin', false);
	window.location.reload();
}