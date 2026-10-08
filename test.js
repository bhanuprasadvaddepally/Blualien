

import handler from './api/contact.js';

const mockReq = {
  method: 'POST',
  body: {
    name: 'Test Name',
    email: 'test@example.com',
    sector: 'Test Sector',
    message: 'Test Message'
  }
};

const mockRes = {
  status: function(code) {
    this.statusCode = code;
    return this;
  },
  json: function(data) {
    console.log(`Status: ${this.statusCode}`);
    console.log(`Response:`, data);
  }
};

handler(mockReq, mockRes).then(() => {
  console.log('Test completed.');
});
