  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyA7eGdB6JlcwhkeXyvbdOZwhdjmjK9djeQ",
    authDomain: "traintime-fcb53.firebaseapp.com",
    databaseURL: "https://traintime-fcb53.firebaseio.com",
    projectId: "traintime-fcb53",
    storageBucket: "",
    messagingSenderId: "1054847748897"
  };

  firebase.initializeApp(config);
  var database = firebase.database()

//   console.log(config);

$("#submit-button").on("click", function (e) {
    e.preventDefault();
    // console.log("TEST");    
    let TrainName = $("#inputTrain").val() 
    // console.log(TrainName);
    let Destination = $("#inptDest").val()
    // console.log(Destination);
    let FirstTrain = $("#inputTime").val()
    let Frequency = $("#inputFrequency").val()
   
    
        var trainData = {
        train: TrainName,
        dest: Destination,
        first: FirstTrain,
        freq: Frequency,
        }
        dateAdded: firebase.database.ServerValue.TIMESTAMP
        // console.log(trainData);

        database.ref().push(trainData);
        // $("#form")[0].reset();
        $("#form").trigger("reset");
    });

   

    database.ref().on("child_added", function(snapshot){
    // console.log(snapshot.key);
    console.log(snapshot.val());
    
    var newTR = $("<tr>")
    
    var newTrainName = $("<td>").text(snapshot.val().train)
    var newDest = $("<td>").text(snapshot.val().dest)
    // var newFirst = $("<td>").text(snapshot.val().first)
    var newFreq = $("<td>").text(snapshot.val().freq)
    
    var firstTimeConverted = moment(snapshot.val().first, "hh:mm").subtract(1, "years");
    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);
    // Time apart (remainder)
    var tRemainder = diffTime % snapshot.val().freq;
    console.log("Time remaining: " + tRemainder);
    // Minute Until Train
    var tMinutesTillTrain = snapshot.val().freq - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    // console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
        
    newTR.append(newTrainName)
    newTR.append(newDest)
    newTR.append(newFreq)
    newTR.append($("<td>").text(moment(nextTrain).format("hh:mm"))); 
    newTR.append($("<td>").text(tMinutesTillTrain));
    
    $("#table-body").append(newTR)
});


    

