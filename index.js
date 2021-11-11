import express from 'express';
import router from './route/routes';
import db from './database/database';

db.sequelize.sync();
const PORT = 8000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/tutorials', router);
// simple route
app.get('/', (req, res) => {
  res.send('Server is running sucessfully');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
