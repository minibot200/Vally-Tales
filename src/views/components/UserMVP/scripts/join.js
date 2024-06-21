users=[]
document.getElementsByTagName('form')[0].addEventListener('change', function(event) {
  event.preventDefault(); // 폼의 기본 제출 동작을 막음

  const emailInput = document.getElementsByName('email')[0].value;
  const password1 = document.getElementsByName('password_1st')[0].value;
  const password2 = document.getElementsByName('password_2nd')[0].value;
  console.log(password1)
  console.log(password2)
  var emailMessage = '';
  let passwordMessage = '';

  if (users.some(user => user.email === emailInput)) {
    emailMessage = '이미 등록된 이메일입니다.';
  }

  if (password1 !== password2) {
    passwordMessage = '비밀번호와 비밀번호 확인이 맞지 않습니다.';
  }

  document.getElementById('email-check-message').textContent = emailMessage;
  document.getElementById('pw-check-message').textContent = passwordMessage;
})
if (!emailMessage && !passwordMessage) {
  alert('회원가입이 완료되었습니다.')
  users.push({email:emailInput, password:password1, name:username})
}