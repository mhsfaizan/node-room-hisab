const express = require('express');
const app = express();
const config = require('config');

require('./db');

//parse json body
app.use(express.json());

const port = process.env.PORT || '3000';

if (!config.get('jwtPrivateKey')) {
    console.error('FATAL ERROR: jwtprivate key not set');
    process.exit(1);
}

// app routes
const userRoutes = require('./routes/user.route'); 
const authRouter = require('./routes/auth.route');


app.use('/api/v1/users', userRoutes);
app.use('/api/v1/auth', authRouter);

app.listen(port, () => {
    console.log(`Server running on ${port}`);
});