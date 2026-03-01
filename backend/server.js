const express = require("express");
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.static("public"));

// API route
app.post("/generate", (req, res) => {
    const {
        length,
        count,
        includeUppercase,
        includeLowercase,
        includeNumbers,
        includeSymbols,
        excludeSimilar,
        excludeAmbiguous,
        customString
    } = req.body;

    let characters = "";

    if (includeUppercase) characters += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeLowercase) characters += "abcdefghijklmnopqrstuvwxyz";
    if (includeNumbers) characters += "0123456789";
    if (includeSymbols) characters += "!@#$%^&*()_+[]{}|;:,.<>?";

    if (excludeSimilar) {
        const similarChars = "il1Lo0O";
        characters = characters.split("").filter(c => !similarChars.includes(c)).join("");
    }

    if (excludeAmbiguous) {
        const ambiguousChars = "{}[]()/\\'\"`~,;:.<>?";
        characters = characters.split("").filter(c => !ambiguousChars.includes(c)).join("");
    }

    let passwords = [];

    for (let j = 0; j < count; j++) {
        let password = customString || "";

        for (let i = password.length; i < length; i++) {
            password += characters.charAt(Math.floor(Math.random() * characters.length));
        }

        passwords.push(password);
    }

    res.json({ passwords });
});
// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});