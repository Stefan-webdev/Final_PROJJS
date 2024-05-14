document.addEventListener('DOMContentLoaded', function(){
  console.log('DOM fully loaded and parsed');
})

document.getElementById('dog-generator').addEventListener('click', generateDog);
document.getElementById('reset').addEventListener('click', reset);


function generateDog() {
  console.log('Generating dog...');
  fetch('https://dog.ceo/api/breeds/image/random')
  .then(response => response.json())
  //Parses JSON response
  .then(data => {
    console.log('API response received:', data);
    if (data.status === 'success') {
      const image = document.createElement('img');
      // Creates an image element
      const div = document.getElementById('flex-dog-gen');
      const breed = data.message.split('/')[4]; // Assuming breed is a part of url path check later for bugs
      image.src = data.message;
      image.setAttribute('data-breed', breed); // Set breed as a data attribute
      image.classList.add('dog-image'); // Add a class for easier CSS + JS targeting
      image.width = 200;
      image.height = 133;
      // sets the height of the image
      image.style.cursor = 'pointer'; // set cursor for image hover
      
      // Add event listeners direc tly to the image
      image.addEventListener('mouseover', function(event) {
        displayBreed(breed, event.target);
      });
      image.addEventListener('mouseout', function(event) {
        removeBreedDisplay();
      });


      div.appendChild(image);
      //Apends the image to the div
    } else {
      console.log('Failed to load dog image:', data);
      // logs an error if API call is unsuccessful. 
    }
  });

}


  function displayBreed(breed, imgElement) {
    const breedDisplay = document.createElement('div');
    breedDisplay.textContent = breed; // Set the breed text
    breedDisplay.style.position = 'absolute';
    breedDisplay.style.top = `${imgElement.offsetTop + imgElement.offsetHeight}px`; //position below image
    breedDisplay.style.left = `${imgElement.offsetLeft}px`; // Align with the image
    breedDisplay.id = 'breed-display';

    document.body.appendChild(breedDisplay);

  }

  function removeBreedDisplay(){
    const breedDisplay = document.getElementById('breed-display');
    if (breedDisplay) {
      breedDisplay.remove();
    }
  } 
