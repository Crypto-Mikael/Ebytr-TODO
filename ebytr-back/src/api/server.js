const employeesRoute = require('../routes/employeesRoute');

const app = require('./app');
const PORT = 4000;

app.use('/employees', employeesRoute)

app.listen(PORT, () => console.log(`✅ Server running at port: ${PORT}`));
