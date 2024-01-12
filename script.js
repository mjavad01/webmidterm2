  function predict() {
  // Get the name from the input field
  let name = document.getElementById('name').value;
  //check name repitaion
  const repitaion_flag = document.getElementById('name').value === document.getElementById('saved-data-name').innerText;
  const repitaion = document.getElementById('repitaion')
  // Check if the name is invalid
  if (name_validate(name)){


  const url = `https://api.genderize.io/?name=${name}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const result = document.getElementById('Prediction');
    

      if (data.gender === 'male') {
        result.textContent = `the name is ${ parseInt(data.probability*100)} % likely to be male.`;

        if (repitaion_flag){
          repitaion.textContent = "this name has been saved :)";

        }

       
      } else if (data.gender === null ) {

        result.textContent = 'There are no predictions for this name.!!!!!!!!!'
        
        if (repitaion_flag){
          repitaion.textContent = "this name has been saved :)";

        }

      } else {
        result.textContent = `the name is ${ parseInt(data.probability*100)} % likely to be female.`;
        console.log(document.getElementById('Prediction').textContent.split(' ').slice(-1))

        
        if (repitaion_flag){
          repitaion.textContent = "this name has been saved :)";

        }

      }
    });
  }
  
  else{

    const result = document.getElementById('Prediction');
    result.textContent='Name is Invalid!'
    return;
  }


}
// Function to validate the input name
function name_validate(name){
// check length is between 1 and 255
  if (name.length > 255 || name.length == 0) {
      return false;
  }
  // disallow specific name
  if (name == "X Æ A-12"){
      return false;
  }
  // allow only letters and whitespace
  if (!/^[A-Za-z\s]*$/.test(name)){
      return false;
  }
  // must contain at least one letter
  if (!/[A-Za-z]/.test(name)){
      return false;
  }
  return true;
}

// Function to save the user's input name and gender
function save_name() {
  // Show save button
  document.getElementById("save").hidden = false;
  // Get user input name
  const user_input_name = document.getElementById('name').value;
  // Get user input gender (male or female)
  const user_input_gender_male =  document.getElementsByName('gender')[0].checked;
  const user_input_gender_female =  document.getElementsByName('gender')[1].checked;

  // If user selected female
  if (user_input_gender_female) {
    // Set saved data name and gender
    document.getElementById('saved-data-name').textContent = user_input_name;
    document.getElementById('saved-data-gender').textContent = "female.";

  // If user selected male
  } else if (user_input_gender_male) {
    // Set saved data name and gender
    document.getElementById('saved-data-name').textContent = user_input_name;
    document.getElementById('saved-data-gender').textContent = "male.";

  // If user did not select gender and prediction is available
  } else if (document.getElementById('Prediction').textContent.split(' ').slice(-1)=='female.' || document.getElementById('Prediction').textContent.split(' ').slice(-1)=='male.') {
    // Set saved data name and gender
    document.getElementById('saved-data-name').textContent = user_input_name;
    document.getElementById('saved-data-gender').textContent = document.getElementById('Prediction').textContent.split(' ').slice(-1);

  } else {
    // Set saved data name and gender
    document.getElementById('saved-data-name').textContent = user_input_name;
    document.getElementById('saved-data-gender').textContent = "you did not select gender for your name :)"
  }
}



//the clear function can be refresh page to clear saved data and i take this approach to clear data
function clear() {
  location.reload(); // Reloads the current page
}
