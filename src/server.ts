import app from './app.js';

const port = 5000 || process.env.PORT;

app.listen(port, () => console.log(`Server running on port ${port}`));