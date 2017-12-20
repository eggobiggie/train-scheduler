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

    console.log(trainName);
    console.log(destination);
    console.log(firstTrain);
    console.log(frequency);

    database.ref().set({
        train: trainName,
        destination: destination,
        first: firstTrain,
        frequency: frequency
    })

  });

