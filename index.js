import app from './app';

const port = process.env.PORT || 5000;

app.listen(5050, () => {
  console.log('http://localhost:5000.');
});
