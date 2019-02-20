// Sets values for the start the program
function primeValues() {
  placeCursorOnLoad();

  // Hides job input
  $("#other-title").hide();

  $(".tooltip").hide();

  // Hides color selection
  $("#color").hide();

  // Sets the label for the color selection to "Please select a T-Shirt Theme"
  $("label[for='color']").text("Please select a T-Shirt Theme");

  // Sets default payment to credit card
  $("#payment").val("credit card");

  hidePaymentOptions();
}

// Places cursor on the first input field on load
function placeCursorOnLoad () {
  $("input[name=user_name]").focus();
}

// Hides the other-title input if the Other option isn't selected as a job title
function otherTitleSelected () {
  if ($("#title :selected").text() === "Other") {
    $("#other-title").show();
  } else {
    $("#other-title").hide();
  }
}

// Hides the color drop down menu until a theme is selected
function shirtDesignSelected () {

  // Gets the text of the selected option
  const selectedOption = $("#design :selected").text();

  // Hides color select if theme is not chosen
  if( selectedOption === "Select Theme") {
    $("#color").hide();
    $("label[for='color']").text("Please select a theme:");
  }

  // If theme is chosen, color drop down menu is shown and adjusted
  else {

    // Shows color options and updates color field
    $("#color").show();
    $("label[for='color']").text("Color:");

    // Hides all non-matching elements and resets the current chosen value
    // Depending on the selected theme
    for (let colorOpt = 0; colorOpt < 6; colorOpt++) {

      if (colorOpt < 3 && selectedOption === "Theme - JS Puns") {

        $("#color").val("cornflowerblue");
        $("#color").children().eq(colorOpt).show();

      } else if (colorOpt >= 3 && selectedOption != "Theme - JS Puns") {

        $("#color").val("tomato");
        $("#color").children().eq(colorOpt).show();

      } else {
        $("#color").children().eq(colorOpt).hide();
      }
    }
  }
}

function showCost () {

  let totalCost = 0;

  // Generates total cost
  for (let activity = 0; activity < 7; activity++) {
    if ($("input[type='checkbox']").eq(activity).is(":checked")) {
      if (activity === 0) {
        totalCost += 100;
      }
      totalCost += 100;
    }
  }

  // If there is a cost, the total is outputted
  if (totalCost > 0) {
    $("#total-cost").text("Total Cost: $" + totalCost);
  } else {
    $("#total-cost").text("");
  }
}

// Strikes out conflicting events
function strikeOutMatches () {

// Loops through all activities and allows them to be chosen again (later use)
  for (let activity = 0; activity < 7; activity++) {
    $(".activities label").eq(activity).removeClass("disabled-button");
    $("input[type='checkbox']").eq(activity).removeAttr("disabled");
  }

// Loops through all checkboxes and if a conflicting time is checked,
// The other activity is greyed out and the checkbox is disabled
  for (let activity = 0; activity < 7; activity++) {

    // Checks if a checkbox is checked
    if ($("input[type='checkbox']").eq(activity).is(":checked")) {

      // Greys out and disables conflicting activity with the one chosen
      if (activity === 1) {
        $("input[type='checkbox']").eq(3).prop("disabled", true);
        $(".activities label").eq(3).addClass("disabled-button");
      } else if (activity === 2) {
        $("input[type='checkbox']").eq(4).prop("disabled", true);
        $(".activities label").eq(4).addClass("disabled-button");
      } else if (activity === 3) {
        $("input[type='checkbox']").eq(1).prop("disabled", true);
        $(".activities label").eq(1).addClass("disabled-button");
      } else if (activity === 4) {
        $("input[type='checkbox']").eq(2).prop("disabled", true);
        $(".activities label").eq(2).addClass("disabled-button");
      }

    }
  }
}

// Updates current state if activities by calculating total cost and disabling
// Conflicting activities
function updateActivities () {
  showCost();
  strikeOutMatches();
}

// Hides payment options that don't match the currently selected option
function hidePaymentOptions () {
  const selectedOption = $("#payment :selected").text();

  // Hides all payment options
  $(".credit-card").hide();
  $("#payment-options p").hide();

  // Shows the selected payment option
  if (selectedOption === "Credit Card") {
    $(".credit-card").show();
  } else if (selectedOption === "PayPal") {
    $("#payment-options p").eq(0).show();
  } else if (selectedOption === "Bitcoin") {
    $("#payment-options p").eq(1).show();
  }

}

// Checks if form is valid, and if not, shows error indications on invalid parts
function isValidForm () {

  let validForm = true;

  // Regex for validation of certain inputs
  const emailRegex = /\w+@\w+.[A-Za-z]{3}/;
  const creditCardNumberRegex = /\d{13,16}/;
  const zipCodeRegex = /\d{5}/;
  const cvvRegex = /\d{3}/;

  resetInvalidInfo();

  // Checks if name field is empty
  if ($("#name").val() === "") {
    validForm = false;
    $("#name").addClass("invalid-information");
    $("label[for='name']").addClass("invalid-label");
  }

  // Checks if a invalid email address is entered
  if (emailRegex.test($("#mail").val()) === false) {
    validForm = false;
    $("#mail").addClass("invalid-information");
    $("label[for='mail']").addClass("invalid-label");
  }

  // Checks if no activities are checked
  if ($("input:checked").length === 0) {
    validForm = false;
    $("legend").eq(2).addClass("invalid-label");
  }

  // Validates Credit Card information if chosen
  if ($("#payment :selected").text() === "Credit Card") {

    // Checks if Credit Card number is valid
    if (creditCardNumberRegex.test($("#cc-num").val()) === false) {
      validForm = false;
      $("#cc-num").addClass("invalid-information");
      $("label[for='cc-num']").addClass("invalid-label");
    }

    // Checks if Zip Code is valid
    if (zipCodeRegex.test($("#zip").val()) === false) {
      validForm = false;
      $("#zip").addClass("invalid-information");
      $("label[for='zip']").addClass("invalid-label");
    }

    // Checks if CVV is valid
    if (cvvRegex.test($("#cvv").val()) === false) {
      validForm = false;
      $("#cvv").addClass("invalid-information");
      $("label[for='cvv']").addClass("invalid-label");
    }

  }

  return validForm;

}

// Resets all css to fit valid info, so that invalids are correctly identified
function resetInvalidInfo () {
  $("#name").removeClass("invalid-information");
  $("#mail").removeClass("invalid-information");
  $("label[for='name']").removeClass("invalid-label");
  $("label[for='mail']").removeClass("invalid-label");
  $("legend").eq(2).removeClass("invalid-label");

  // Credit card info only
  if ($("#payment :selected").text() === "Credit Card") {
    $("#cc-num").removeClass("invalid-information");
    $("#zip").removeClass("invalid-information");
    $("#cvv").removeClass("invalid-information");
    $("label[for='cc-num']").removeClass("invalid-label");
    $("label[for='zip']").removeClass("invalid-label");
    $("label[for='cvv']").removeClass("invalid-label");
  }
}

// Displays email error if invalid email
function displayPossError () {
  const emailRegex = /\w+@\w+\.[A-Za-z]{3}/;
  $(".tooltip").hide();

  // Error if no text is entere
  if ($("#mail").val() === "") {
    $(".tooltip").eq(0).show();
  }

  // Error if text is not a valid email
  else if (emailRegex.test($("#mail").val()) === false) {
    $(".tooltip").eq(1).show();
  }
}

// Event listener for other job input
$("#title").change(otherTitleSelected);

$("#mail").keyup(displayPossError);

// Event listener for if a theme is selected or not
$("#design").change(shirtDesignSelected);

// Event listener for a change in selected activities
$(".activities").change(updateActivities);

// Event listener for a change in payment
$("#payment").change(hidePaymentOptions);

// Event Listener that checks if valid submit on submission
$("button").click(function(event) {
  if (isValidForm() === false) {
    event.preventDefault();
  }
});

// Sets values for initial program run
primeValues()
