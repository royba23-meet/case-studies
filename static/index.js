let btn = document.getElementById("btn");



/*  ********** Online / Offline Detection **********  */

// Request a small image at an interval to determine status
    // ** Use this code with an HTML element with id="status"

const checkOnlineStatus = async () => {
    try {
      const online = await fetch("http://192.168.15.58:8080");
      return online.status >= 200 && online.status < 300; // either true or false
    } catch (err) {
      return false; // definitely offline
    }
  };
  
  setInterval(async () => {
    const result = await checkOnlineStatus();
    const statusDisplay = document.getElementById("status");
    statusDisplay.textContent = result ? "Online" : "OFFline";
  }, 3000); // probably too often, try 30000 for every 30 seconds
  
  // forgot to include async load event listener in the video! 
  btn.addEventListener('click', async () => {
    await checkOnlineStatus()
      ? console.log("Online! SENT MESSAGE")
      : console.log("Offline! COULD NOT SEND MESSAGE")
  });

  /* ********** NEED TO INTERPET FORM REQUESTS FROM HTML FILE TO JS AND IF CONNECTED SEND IT USING XHL **********  */