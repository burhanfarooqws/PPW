// DOM Ready =============================================================
$(document).ready(function() {

	$.ajaxSetup({ cache: false });
	//setInterval('populateLeads()', 5000);

    populateLeads();

    // Add Lead button click
    $('#btnAddLead').on('click', addLead);

});

// Functions =============================================================


// Fill table with data
function populateLeads() {        
	var now = new Date();	
        $.ajax({
            type: 'GET',            
            url: '/leads/leadlist?query='+ new Date().valueOf(),
            dataType: 'JSON',
			cache: false,
			async: true,
            contentType: "application/json",			
			success:function(data) {
                //$('#leadList table > tbody').html('');
				$('#leadList table tbody > tr:nth-child(n+2)').remove();
				var html = null;
            // For each item in our JSON, add a table row and cells to the content string
			
		_.forEach(data, function(lead) {
			 html += '<tr>';

            html += '<td>' + lead.name + '</td>';

            if(!lead.email){
                html += '<td>'+ null +'</td>';
            }
            else{
                html += '<td>'+ lead.email.email + '</td>';
            }

            html += '</tr>';
			// Inject the whole content string into our existing HTML table
			$('#leadList table > tbody').html(html);
		});
		
            }

        });	
    	
    
};

// Add Lead
function addLead(event) {
    event.preventDefault();

    // Super basic validation - increase errorCount variable if any fields are blank
    var errorCount = 0;
    $('#addLead input').each(function(index, val) {
        if($(this).val() === '') { errorCount++; }
    });

    // Check and make sure errorCount's still at zero
    if(errorCount === 0) {

        var name = $('#addLead fieldset input#inputUserName').val();
        var email = $('#addLead fieldset input#inputUserEmail').val();
        var newLead = {
            "name": name,
            "email": {
                "email": email,
                "category": "work"
            }
        };

        $.ajax({
            type: 'POST',
            data: JSON.stringify(newLead),
            url: '/leads/addlead',
            dataType: 'JSON',
            contentType: "application/json"
        }).done(function( response ) {

            $('#leadList table tbody > tr:nth-child(n+2)').remove();
			// Clear the form inputs
            $('#addLead fieldset input').val('');
            // Update the table
			setTimeout('populateLeads()', 2000);
        });
    }
    else {
        // If errorCount is more than 0, error out
        alert('Please fill in all fields');
        return false;
    }
};