import axios from 'axios';

axios.get('http://localhost:5000')
  .then(response => {
    console.log('Response:', response.data);
  })
  .catch(error => {
    console.error('Error:', error.message);
  });