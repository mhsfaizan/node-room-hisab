const express = require('express');
const app = express();

const userRoutes = require('./routes/user.route'); 

const port = process.env.PORT || '3000';

app.use('/api/v1/users', userRoutes);

app.listen(port, () => {
    console.log(`Server running on ${port}`);
});