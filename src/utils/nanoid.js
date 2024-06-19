//나노이드 사용
const { nanoid } = require('nanoid');

function generateNanoId() {
  return nanoid();
}

module.exports = generateNanoId;
