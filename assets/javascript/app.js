//Add Firebase
  var config = {
    apiKey: "AIzaSyDgjYRihiYbhowGbp7FUNhDrK_4tnI-Nto",
    authDomain: "train-scheduler-ff900.firebaseapp.com",
    databaseURL: "https://train-scheduler-ff900.firebaseio.com",
    projectId: "train-scheduler-ff900",
    storageBucket: "",
    messagingSenderId: "77408372124"
  };

  firebase.initializeApp(config);

  var database = firebase.database();

  //Empty variables for user input
  var trainName = "";
  var destination = "";
  var firstTrain = "";
  var frequency = 0;

  $(".add-train").on("click", function() {

    event.preventDefault();

    trainName = $("#train-input").val().trim();
    destination = $("#destination-input").val().trim();
    firstTrain = $("#first-input").val().trim();
    frequency = $("#frequency-input").val().trim();

    var newTrain = {
      train: trainName,
      destination: destination,
      first: firstTrain,
      frequency: frequency
    };

    console.log(trainName);
    console.log(destination);
    console.log(firstTrain);
    console.log(frequency);

    database.ref().push(newTrain);

    alert("Train successfully added");

    $("#train-input").val("");
    $("#destination-input").val("");
    $("#first-input").val("");
    $("#frequency-input").val("");

  });

  database.ref().on("child_added", function(childSnapshot, prevChildkey) {
    console.log(childSnapshot.val());

    var trainName = childSnapshot.val().train;
    var destination = childSnapshot.val().destination;
    var firstTrain = childSnapshot.val().first;
    var frequency = childSnapshot.val().frequency;

    console.log(trainName);
    console.log(destination);
    console.log(firstTrain);
    console.log(frequency);

    //add moment.js for time format

    //then add the math to figure out frequency vs arrival time

    //calculate time until arrival and console.log to confirm

    //add train's data to the table
    $("#train-table > tbody").append("<tr><td class='center-align'>" + trainName + "</td><td class='center-align'>" + destination + "</td><td class='center-align'>" + frequency
  + "</td><td class='center-align'>" + "time of arrival goes here" + "</td><td class='center-align'>" + "minutes away" + "</td></tr>");


  });

