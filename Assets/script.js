// document.ready function
$(function(){
    //display the date as day of the week, month day
    const date = moment().format('dddd, MMMM Do');
    const currentHour = moment().format('H');

    //date displayed at the top
    let $dateHeading = $('#currentDay');
    $dateHeading.text(date)
    
  // Get stored to-do items from local storage
  let storedPlans = JSON.parse(localStorage.getItem("storedPlans"));
  
  // If there were plans in local storage, update the plan array to it
  if (storedPlans !== null) {
    planTextArr = storedPlans;
  } else {
        planTextArr = new Array(9);
    }
  // set variable referencing planner container
  let $plannerDiv = $('#plannerContainer');

  // make the planner rows from 9 am to 5 pm
  for (let hour = 9; hour <= 17; hour++) {
    let index = hour - 9;
    
    // build row components
    let $rowDiv = $('<div>');
    $rowDiv.addClass('row');
    $rowDiv.attr('hourIndex',hour);
  
    // the time portion of row
    let $timeDiv = $('<div>');
    $timeDiv.addClass('col-2 hour');
  
    // create an element that contains time
    const $timeContainer = $('<span>');
    // can use this to get value
    $timeContainer.attr('class','timeDisplay');
    
    // format hours for display with proper am/pm delegation
    let displayHour = 0;
    let ampm = "";
    if (hour > 12) { 
      displayHour = hour - 12;
      ampm = "pm";
    } else if (hour === 12){
        displayHour = hour;
        ampm = "pm";
    } else {
      displayHour = hour;
      ampm = "am";
    }
    
    // put the time in the timeContainer 
    $timeContainer.text(`${displayHour} ${ampm}`);

    // appending the timeDiv and timeContainer to the main rowDiv
    $rowDiv.append($timeDiv);
    $timeDiv.append($timeContainer);

    // build row components with the daily plans
    let $dailyPlans = $('<input>');

    $dailyPlans.attr('id',`input-${index}`);
    $dailyPlans.attr('hourIndex',index);
    $dailyPlans.attr('type','text');
    $dailyPlans.attr('class','dailyPlan');

    // access index from data array for hour 
    $dailyPlans.val( planTextArr[index] );
    
    // create a column to control the spacing
    let $plansCol = $('<div>');
    $plansCol.addClass('col-md-9');

    // appending the plans column to the rowDiv
    $rowDiv.append($plansCol);
    $plansCol.append($dailyPlans);
   
    //creating the save button
    let $saveSpace = $('<div>');
    $saveSpace.addClass('col-md-1 saveBtn');
  //using a font awesome save icon
    let $saveBtn = $('<i>');
    $saveBtn.attr('id',`saveid-${index}`);
    $saveBtn.attr('save-id',index);
    $saveBtn.attr('class',"fas fa-save");
    
    // appending the save button to the rowDiv
    $rowDiv.append($saveSpace);
    $saveSpace.append($saveBtn);
    

    // change the row color based on time
    changeRowColor($rowDiv, hour);
    
    // appending the rowDiv to the main plannerDiv
    $plannerDiv.append($rowDiv);
  };

  // function to change row color based on past, present, or future
  function changeRowColor ($hourRow,hour) { 
    if ( hour < currentHour) {
      $hourRow.addClass('past');
    } else if ( hour > currentHour) {
      $hourRow.addClass('future');
    } else {
      $hourRow.addClass('present')
    }
  };

  // save plans to local storage
  $(document).on('click','i', function(event) {
    event.preventDefault();  
    let $index = $(this).attr('save-id');
    let inputId = '#input-'+$index;
    let $value = $(inputId).val();
    planTextArr[$index] = $value;
    localStorage.setItem("storedPlans", JSON.stringify(planTextArr));
  });  
  
});