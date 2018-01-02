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

    // Calculations for current time vs initial time of train vs train frequency
    var initialTimeConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
    console.log(initialTimeConverted);

    var currentTime = moment();
    console.log("Current time: " + moment(currentTime).format("HH:mm"));

    var timeDiff = moment().diff(moment(initialTimeConverted), "minutes");
    console.log("Time difference: " + timeDiff);

    var timeRemainder = timeDiff % frequency;
    console.log(timeRemainder);

    var minUntilTrain = frequency - timeRemainder;
    console.log("Minutes until next train: " + minUntilTrain);

    var nextTrain = moment().add(minUntilTrain, "minutes");

    var nextTrainFormatted = moment(nextTrain).format("HH:mm");
    console.log(nextTrainFormatted);

    //Display the information onto the page
    $("#train-table > tbody").append("<tr><td class='center-align'>" + trainName + "</td><td class='center-align'>" + destination + "</td><td class='center-align'>" + frequency
  + "</td><td class='center-align'>" + nextTrainFormatted + "</td><td class='center-align'>" + minUntilTrain + "</td></tr>");

  });

