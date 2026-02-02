// Login handler
document.addEventListener('DOMContentLoaded', () => { // when the html has been completely loaded execute this function
	const loginForm = document.getElementById('loginForm');
	const emailInput = document.getElementById('email');
	const passwordInput = document.getElementById('password');
	const messageDisplay = document.getElementById('message');

	if (loginForm) {
		loginForm.addEventListener('submit', async (event) => {
			event.preventDefault(); // prevent default form submission
			console.log("pressed")
			const loginBtn = loginForm.querySelector('button[type="submit"]');
			loginBtn.disabled = true;

			const email = emailInput.value;
			const password = passwordInput.value;

			// frontend validation
			if (!email || !password) {
				messageDisplay.textContent = 'Please enter both email and password.';
				messageDisplay.style.color = 'red';
				loginBtn.disabled = false;
				return;
			}
			console.log(password)


			try {
				const response = await fetch('http://localhost:3000/login', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ email, password }),
				});

				const data = await response.json();

				if (response.ok) {
					messageDisplay.textContent = data.message;
					messageDisplay.style.color = 'lime';
					console.log('Login successful:', data.user);
				} else {
					messageDisplay.textContent = data.message || 'Login failed.';
					messageDisplay.style.color = 'red';
					console.error('Login failed:', data.message);
				}
			} catch (error) {
				messageDisplay.textContent = 'Network error. Could not connect to the server.';
				messageDisplay.style.color = 'red';
				console.error('Fetch error:', error);
			} finally {
				loginBtn.disabled = false
			}
		});
	}
});
