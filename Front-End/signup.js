
document.addEventListener('DOMContentLoaded', () => { // when the html has been completely loaded execute this function
	const signupForm = document.getElementById('signup-form');
	const fullnInput = document.getElementById("fullname")
	const usernInput = document.getElementById("username")
	const emailInput = document.getElementById('email');
	const passwordInput = document.getElementById('password');
	const messageDisplay = document.getElementById('message');

	if (signupForm) {
		signupForm.addEventListener('submit', async (event) => {
			event.preventDefault(); // prevent default form submission
			console.log("pressed")
			const signupBtn = signupForm.querySelector('button[type="submit"]');
			signupBtn.disabled = true;

			const fullname = fullnInput.value.trim();
			const username = usernInput.value.trim();
			const email = emailInput.value.trim();
			const password = passwordInput.value.trim();

			// frontend validation
			if (!email || !password || !fullname || !username) {
				messageDisplay.textContent = 'Please enter all the credentials';
				messageDisplay.style.color = 'red';
				signupBtn.disabled = false;
				return;
			}
			console.log(password)


			try {
				const response = await fetch('http://localhost:3000/signup', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ fullname, username, email, password }),
				});

				const data = await response.json();

				if (response.ok) {
					messageDisplay.textContent = data.message;
					messageDisplay.style.color = 'lime';
					console.log('Signup successful:', data.user);


					window.location.href = `index.html/?id=${data.userId}`;
				} else {
					messageDisplay.textContent = data.message || 'Signup failed.';
					messageDisplay.style.color = 'red';
					console.error('Signup failed:', data.message);
				}
			} catch (error) {
				messageDisplay.textContent = 'Network error. Could not connect to the server.';
				messageDisplay.style.color = 'red';
				console.error('Fetch error:', error);
			} finally {
				signupBtn.disabled = false
			}
		});
	}
});
