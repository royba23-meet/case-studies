let btn = document.getElementById("btn");
let data = new FormData();
const xhr = new XMLHttpRequest();
const url = "http://192.168.15.58:8080/";
xhr.open('POST', '/', true);
xhr.setRequestHeader('accept', 'application/json');
xhr.setRequestHeader('Content-Type', 'application/json');



/*  ********** Online / Offline Detection **********  */

// Request a small image at an interval to determine status
    // ** Use this code with an HTML element with id="status"

const checkOnlineStatus = async () => {
    try {
      const online = await fetch(url);
      return online.status >= 200 && online.status < 300; // either true or false
    } catch (err) {
      return false; // definitely offline
    }
  };

  btn.addEventListener('click', async () => {
    const result = await checkOnlineStatus();
    if (result) {
      data.append('name', document.getElementById("name").value);
      data.append('surname', document.getElementById("surname").value);
      data.append('message', document.getElementById("message").value);
      let dict = JSON.stringify({'name' : data.get('name'), 'surname' : data.get('surname'), 'message' : data.get('message')});
      console.log(dict);
      xhr.send(dict);
      console.log('%c Message sent | Information uploaded to database', 'color: green;')
    }
    else {
      console.log('%c Message not sent | No connection to internet', 'color: red;');
      const interval = setInterval(async () => {
        const result = await checkOnlineStatus();
        if (result) {
          data.append('name', document.getElementById("name").value);
          data.append('surname', document.getElementById("surname").value);
          data.append('message', document.getElementById("message").value);
          let dict = JSON.stringify({'name' : data.get('name'), 'surname' : data.get('surname'), 'message' : data.get('message')});
          xhr.send(dict);
          console.log('%c Message sent | Information uploaded to database', 'color: green;')
          clearInterval(interval);
        }
        else {
          console.log('%c Message not sent | No connection to internet', 'color: red;');
        }
      }, 15000)}
    });
  
  // setInterval(async () => {
  //   const result = await checkOnlineStatus();
  //   const statusDisplay = document.getElementById("status");
  //   statusDisplay.textContent = result ? "Online" : "OFFline";
  // }, 3000); // probably too often, try 30000 for every 30 seconds
  
  // forgot to include async load event listener in the video! 
  // btn.addEventListener('click', async () => {
  //   await checkOnlineStatus()
  //     ? console.log("Online! SENT MESSAGE")
  //     : console.log("Offline! COULD NOT SEND MESSAGE")
  // });

  /* ********** NEED TO INTERPET FORM REQUESTS FROM HTML FILE TO JS AND IF CONNECTED SEND IT USING XHL **********  */
