let isPassport = (str) => {
  var isChar = /[^a-zA-Z0-9]/;
  if(isChar.test(str) === false) {
      return true;
  } else {
      return false;
  }
};

let formValidation = () => {
  let passport = document.getElementById('passport');
  let passportValidation = document.getElementById('passport-validation');

  if(passport.value === "") {
      passportValidation.innerHTML = 'Warning: This input cannot be empty.'
      passportValidation.style.display = 'block';
      return false;
  } else {
      passportValidation.style.display = 'none';
  }
  if(isPassport(passport.value) === false) {
      passportValidation.innerHTML = 'Warning: This input cannot contain any special character and white space.'
      passportValidation.style.display = 'block';
      return false;
  } else {
    passportValidation.style.display = 'none';
  }
  if(passport.value.length <7 || passport.value.length > 30) {
      passportValidation.innerHTML = 'Warning: This input must be between 7 and 15 characters long.'
      passportValidation.style.display = 'block';
      return false;
  } else {
      passportValidation.style.display = 'none';
  }
}