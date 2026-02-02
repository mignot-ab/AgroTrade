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

/* Start server */
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});