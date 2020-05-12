function validateInput(name='sanchit', age=1, email, password) {
  let errorsArray = [];

  // Check required fields
  if (!name || !age || !email || !password) {
    errorsArray.push({ message: "Please fill all fields" });
  }

  // Check age
  if (age < 1) {
    errorsArray.push({ message: "Age must be atleast 1" });
  }

  // Check age type
  if(isNaN(age)){
    errorsArray.push({ message: 'Incorrect age'});
  }

  // Check password length
  if (password.length < 6) {
    errorsArray.push({ message: "Password must be atleast 6 characters" });
  }

  // Email validation
  const pattern = /^\w+([.-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/;
  if (!pattern.test(email)) {
    errorsArray.push({ message: "Please enter correct Email ID" });
  }

  return errorsArray;
}



module.exports = validateInput;