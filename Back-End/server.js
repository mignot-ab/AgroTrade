const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

/* Test route */
app.get("/", (req, res) => {
	res.send("AgroTrade API is running 🚜");
});

/* Get all products */
app.get("/products", (req, res) => {
	const sql = `
        SELECT p.product_id, p.product_name, p.price_etb,
               p.stock_quantity, p.description, p.is_famous,
               c.category_name
        FROM products p
        JOIN categories c ON p.category_id = c.category_id
    `;

	db.query(sql, (err, results) => {
		if (err) {
			return res.status(500).json({ error: err.message });
		}
		res.json(results);
	});
});

app.post("/login", async (req, res) => {
	const { email, password } = req.body;

	try {
		const [rows] = await db.execute(
			'SELECT * FROM users WHERE email = ? AND TRIM(password_hash) = TRIM(?)',
			[email, password]
		);

		if (rows.length == 0) return res.status(401).json({ message: 'Invalid email or password' });

		const user = rows[0];
        console.log(user.password)


		if (password === user.password_hash) {
			res.status(200).json({
				message: 'Login Successful',
				user: { id: user.id, username: user.username }
			});
		} else {
			res.status(402).json({ message: 'Invalid email or password' });
		}

	} catch (err) {
		console.error('Database Error: ', err);
		res.status(500).json({ message: 'Server error' })
	}
})

/* Start server */
app.listen(PORT, () => {
	console.log(`🚀 Server running at http://localhost:${PORT}`);
});
