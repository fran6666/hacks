let currentURL = '';
let index = 0; // Define index outside the loop

async function pressGenerateButton() {
  // Simulating button press
  const generateButton = document.getElementById("generate-button");
  if (generateButton && generateButton.children.length > 0) {
    generateButton.children[0].click(); // Simulating a click on the first child of the element with ID "generate-button"
    console.log("Button pressed!");
    // Replace this with your actual button press logic
  } else {
    console.log("Button or its child not found.");
  }
  await delayedFunctionGenerateButton()
}

async function pressSelectButton() {
  while (true) {
    await sleep(2000);
    const parentElement = document.querySelectorAll('.self-end')[1];
    // Check if the element with class 'self-end' exists
    if (parentElement) {
      // Get the last child element of the 'self-end' element
      const lastChild = parentElement.lastElementChild;
  
      // Check if it's a button with inner text 'Select'
      if (lastChild.tagName === 'BUTTON' && lastChild.innerText.trim() === 'Select') {
        lastChild.click(); // Simulating a click on the first child of the element with ID "generate-button"
        console.log("Select Button pressed!");
      }
    }
  } 
} 

async function pressAnimateButton() {
  // Simulating button press
  const generateButton = document.querySelector('.relative.px-6.py-3');
  if (generateButton) {
    generateButton.click(); // Simulating a click on the first child of the element with ID "generate-button"
    console.log("Button pressed!");
    await delayedFunctionConfirm();
    
    // Replace this with your actual button press logic
  } else {
    console.log("Button or its child not found.");
    await sleep(2000);
    await delayedFunctionEmpty();
    await pressAnimateButton();
  }
}

async function processDeleteElements() {
  await sleep(2000);
  while (true) {
    const elements = document.querySelectorAll('.absolute.bg-grey-400');
    const element = elements[index]?.children[0]?.children[0];
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });

    if (!element) break;

    const mouseOverEvent = new MouseEvent('mouseover', {
      bubbles: true,
      cancelable: true,
      view: window
    });

    element.dispatchEvent(mouseOverEvent);
    await sleep(500);

    let parentElement = element.querySelector('.relative.bg-white.rounded-md');
    let children = parentElement ? parentElement.children : null;

    if (children && children.length > 0) {
      for (let i = 0; i < children.length; i++) {
        children[i].click();
        await sleep(500);
      }
  
      if (parentElement.querySelectorAll('.cursor-not-allowed').length === 5) {
        parentElement.querySelector('.text-red-500').click();
        await sleep(1000);
        const redElement = document.querySelector('.bg-red-500');
        
        if (redElement) {
          redElement.click();
        } else {
          console.log("Element with class 'bg-red-500' not found.");
          // Handle the absence of the element if needed
        }
        await sleep(2000);
      } else {
        index = index + 1;
      }
    }
  }
}

async function Main() {
  currentURL = window.location.href;
  const urlParams = new URLSearchParams(window.location.search);
  
  // Vérification si l'URL contient 'my_library'
  if (currentURL.includes('my_library')) {
      // Faire quelque chose si 'my_library' est dans l'URL
      console.log("L'URL contient 'my_library'");
      
      // Get the value of a specific parameter by name
      const paramStepValue = urlParams.get('step');
      
      if(paramStepValue == "delete"){
        await processDeleteElements();
      } else if(paramStepValue == "autoselect"){
        await pressSelectButton();
      } else if(paramStepValue == "download"){
        await pressDownloadButton();
      }
      
  } else {
      // Get the value of a specific parameter by name
      debugger;
      const paramValue = urlParams.get('auto');
      if(paramValue == "1"){
        //Généré images/videos 
        const delay = Math.floor(Math.random() * 5000) + 5000; // Random delay between 1 and 5 seconds in milliseconds
        console.log("Delay : " + delay.toString() + " milliseconds");
        await sleep(delay);
        await pressGenerateButton(); // Call the function to press the button
      }
  }
}

async function delayedFunctionConfirm() {
  document.querySelectorAll("button.py-4.mx-auto.rounded-md.bg-blue-500.btn.w-full")[1].click()
  await sleep(70000); // Introduce a delay before calling delayedFunctionBack
  await delayedFunctionBack();
}

async function delayedFunctionBack() {
  await sleep(2000); // Introduce a delay before redirecting
  window.location.href = currentURL;
}

function delayedFunctionEmpty(){
    console.log("Button or its child not found.");
}

async function delayedFunctionGenerateButton(){
  console.log("Button or its child not found.");
  await sleep(2000); // Introduce a delay before calling pressGenerateButton
  await pressGenerateButton();
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function Main2() {
  alert("test");
}

// Start the loop
Main2();
