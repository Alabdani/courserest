// studentList, groupList, and groupStudentList data arrays (global objects are bad!)
var studentListData = [];
var groupListData = [];
var groupStudentListData = [];
var forumNotesData = [];

// DOM Ready =============================================================
$(document).ready(function() {

    // Populate the student, group, groupStudent, and forumNotes tables on initial page load
    populateStudentTable();
    populateGroupTable();
    populateGroupStudentTable();
    populateForumNotesTable(); 

    // Add Student button click
    $('#btnAddStudent').on('click', addStudent);

    // Remove Student link click
    $('#studentList table tbody').on('click', 'td a.linkremovestudent', removeStudent);

    // Add Group button click
    $('#btnCreateGroup').on('click', createGroup);

    // Delete Group link click
    $('#groupList table tbody').on('click', 'td a.linkdeletegroup', deleteGroup);

    // Add Student link click
    $('#btnAddStudentToGroup').on('click', addStudentToGroup);

    // Remove Group-Student link click
    $('#groupStudentList table tbody').on('click', 'td a.linkremovegroupStudent', removeGroupStudent);

    // Add Forum note link click
    $('#btnAddForumNote').on('click', addForumNote);

});
// Functions =============================================================
// for student

// Fill table with data
function populateStudentTable() {

    // Empty content string
    var tableContent = '';

    // jQuery AJAX call for JSON
    $.getJSON( '/students/studentlist', function(data) {

        // Stick student data array into a studentlist variable in the global object
        studentListData = data;

        // For each item in JSON, add a table row and cells to the content string
        $.each(data, function(){
            tableContent += '<tr>';
            tableContent += '<td>' + this.studentname + '</td>';
            tableContent += '<td><a href="#" class="linkremovestudent" rel="' + this._id + '">remove</a></td>';
            tableContent += '</tr>';
        });

        // Inject the whole content string into the existing HTML table
        $('#studentList table tbody').html(tableContent);
    });
};

// Add Student
function addStudent(event) {
    
    event.preventDefault();

    // Super basic validation - increase errorCount variable if any fields are blank
    var errorCount = 0;
    $('#addStudent input').each(function(index, val) {
        if ($(this).val() === '') { errorCount++; }
    });

    // Check and make sure errorCount's still at zero
    if (errorCount === 0) {

        // If it is, compile all student info into one object
        var newStudent = {
            'studentname': $('#addStudent fieldset input#inputStudentName').val()
        }
        
        // Check for duplicate Student entries
        for (var student in studentListData) {
            if (studentListData[student]["studentname"] == newStudent.studentname) {
                alert("Student " + newStudent.studentname + " already exists in the list.");
                return false;
            } 
        }

        // Use AJAX to post the object to the adduser service
        $.ajax({
            type: 'POST',
            data: newStudent,
            url: '/students/addstudent/',
            dataType: 'JSON'
        }).done(function( response ) {

            // Check for successful (blank) response
            if (response.msg === '') {
                
                // Clear the form inputs
                $('#addStudent fieldset input').val('');

                // Update the table
                populateStudentTable();
            
            } else {

                // If something goes wrong, alert the error message that the service returned
                alert('Error: ' + response.msg);
            }
        });
    }
    else {
        // If errorCount is more than 0, error out
        alert('Please fill in all fields');
        return false;
    }
};

// Remove Student
function removeStudent(event) {

    event.preventDefault();

    // Pop up a confirmation dialog
    var confirmation = confirm('Are you sure you want to remove this Student?');

    // Check and make sure the user confirmed
    if (confirmation === true) {
        
        // If they did, do delete
        $.ajax({
            type: 'DELETE',
            url: '/students/removeStudent/' + $(this).attr('rel')
        }).done(function( response ) {

            // Check for a successful (blank) response
            if (response.msg === '') {
            }
            else {
                alert('Error: ' + response.msg);
            }

            // Update the table
            populateStudentTable();

        });

    }
    else {

        // If they said no to the confirm, do nothing
        return false;
    }
};

// for group

// Fill table with data
function populateGroupTable() {

    // Empty content string
    var tableContent = '';

    // jQuery AJAX call for JSON
    $.getJSON( '/groups/grouplist', function(data) {

        // Stick student data array into a grouplist variable in the global object
        groupListData = data;

        // For each item in JSON, add a table row and cells to the content string
        $.each(data, function(){
            tableContent += '<tr>';
            tableContent += '<td>' + this.groupname + '</td>';
            tableContent += '<td><a href="#" class="linkdeletegroup" rel="' + this._id + '">delete</a></td>';
            tableContent += '</tr>';
        });

        // Inject the whole content string into the existing HTML table
        $('#groupList table tbody').html(tableContent);
    });
};

// Add Group
function createGroup(event) {
    
    event.preventDefault();

    // Super basic validation - increase errorCount variable if any fields are blank
    var errorCount = 0;
    $('#createGroup input').each(function(index, val) {
        if ($(this).val() === '') { errorCount++; }
    });

    // Check and make sure errorCount's still at zero
    if (errorCount === 0) {

        // If it is, compile all group info into one object
        var newGroup = {
            'groupname': $('#createGroup fieldset input#inputGroupName').val()
        }

        // Check for duplicate Group entries
        for (var group in groupListData) {
            if (groupListData[group]["groupname"] == newGroup.groupname) {
                alert("Group " + newGroup.groupname + " already exists in the list.");
                return false;
            } 
        }

        // Use AJAX to post the object to the creategroup service
        $.ajax({
            type: 'POST',
            data: newGroup,
            url: '/groups/createGroup',
            dataType: 'JSON'
        }).done(function( response ) {

            // Check for successful (blank) response
            if (response.msg === '') {

                // Clear the form inputs
                $('#createGroup fieldset input').val('');

                // Update the table
                populateGroupTable();

            }
            else {

                // If something goes wrong, alert the error message that the service returned
                alert('Error: ' + response.msg);

            }
        });
    }
    else {
        // If errorCount is more than 0, error out
        alert('Please fill in all fields');
        return false;
    }
};

// Delete Student
function deleteGroup(event) {

    event.preventDefault();

    // Pop up a confirmation dialog
    var confirmation = confirm('Are you sure you want to delete this Group?');

    // Check and make sure the user confirmed
    if (confirmation === true) {

        // If they did, do delete
        $.ajax({
            type: 'DELETE',
            url: '/groups/deleteGroup/' + $(this).attr('rel')
        }).done(function( response ) {

            // Check for a successful (blank) response
            if (response.msg === '') {
            }
            else {
                alert('Error: ' + response.msg);
            }

            // Update the table
            populateGroupTable();
        });

    }
    else {

        // If they said no to the confirm, do nothing
        return false;
    }
};

// Fill table with data
function populateGroupStudentTable() {
    
    // Empty content string
    var tableContent = '';
    
    // jQuery AJAX call for JSON
    $.getJSON( '/groups/groupStudentList', function(data) {

        // Stick student data array into a grouplist variable in the global object
        groupStudentListData = data;

        // For each item in JSON, add a table row and cells to the content string
        $.each(data, function(){
            tableContent += '<tr>';
            tableContent += '<td>' + this.groupName + '</td>';
            tableContent += '<td>' + this.studentName + '</td>';
            tableContent += '<td><a href="#" class="linkremovegroupStudent" rel="' + this._id + '">remove</a></td>';
            tableContent += '</tr>';
        });

        // Inject the whole content string into the existing HTML table
        $('#groupStudentList table tbody').html(tableContent);
    });
};

// Add Student
function addStudentToGroup(event) {

    event.preventDefault();

    // Super basic validation - increase errorCount variable if any fields are blank
    var errorCount = 0;
    $('#addStudentToGroup input').each(function(index, val) {
        if ($(this).val() === '') { errorCount++; }
    });

    // Check and make sure errorCount's still at zero
    if (errorCount === 0) {

        // If it is, compile all student/group info into one object
        var newGroupStudent = {
            'groupName': $('#addStudentToGroup fieldset input#inputGroupStudentName').val(),
            'studentName': $('#addStudentToGroup fieldset input#inputStudentGroupName').val(),  
        }

        // Use AJAX to post the object to the addStudentToGroup service
        $.ajax({
            type: 'POST',
            data: newGroupStudent,
            url: '/groups/addStudent/',
            dataType: 'JSON'
        }).done(function( response ) {

            // Check for successful (blank) response
            if (response.msg === '') {

                // Clear the form inputs
                $('#addStudentToGroup fieldset input').val('');
                $('#addStudentToGroup fieldset input').val('');

                // Update the table
                populateGroupStudentTable();

            }
            else {

                // If something goes wrong, alert the error message that the service returned
                alert('Error: ' + response.msg);

            }
        });
    }
    else {
        // If errorCount is more than 0, error out
        alert('Please fill in all fields');
        return false;
    }  
};

// Remove Student from a Group
function removeGroupStudent(event) {

    event.preventDefault();

    // Pop up a confirmation dialog
    var confirmation = confirm('Are you sure you want to remove this Student from the Group?');

    // Check and make sure the user confirmed
    if (confirmation === true) {
        
        // If they did, do delete
        $.ajax({
            type: 'DELETE',
            url: '/groups/removeGroupStudent/' + $(this).attr('rel')
        }).done(function( response ) {

            // Check for a successful (blank) response
            if (response.msg === '') {
            }
            else {
                alert('Error: ' + response.msg);
            }

            // Update the table
            populateGroupStudentTable();

        });

    }
    else {

        // If they said no to the confirm, do nothing
        return false;
    }
};

// Fill table with data
function populateForumNotesTable() {

    // Empty content string
    var tableContent = '';

    // jQuery AJAX call for JSON
    $.getJSON( '/forumNotes/forumNote', function(data) {

        // Stick student data array into a studentlist variable in the global object
        forumNotesData = data;

        // For each item in JSON, add a table row and cells to the content string
        $.each(data, function(){
            tableContent += '<tr>';
            tableContent += '<td>' + this.forumNote + '</td>';
            tableContent += '</tr>';
        });

        // Inject the whole content string into the existing HTML table
        $('#forumNotes table tbody').html(tableContent);
    });
};

// Add Student
function addForumNote(event) {
    
    event.preventDefault();

    // Super basic validation - increase errorCount variable if any fields are blank
    var errorCount = 0;
    $('#addForumNote textarea').each(function(index, val) {
        if ($(this).val() === '') { errorCount++; }
    });

    // Check and make sure errorCount's still at zero
    if (errorCount === 0) {

        // If it is, compile all student info into one object
        var newForumNote = {
            'forumNote': $('#addForumNote fieldset textarea#textareaForumNote').val()
        }

        // Use AJAX to post the object to the adduser service
        $.ajax({
            type: 'POST',
            data: newForumNote,
            url: '/forumNotes/addForumNote/',
            dataType: 'JSON'
        }).done(function( response ) {

            // Check for successful (blank) response
            if (response.msg === '') {
                
                // Clear the form inputs
                $('#addForumNote fieldset textarea').val('');

                // Update the table
                populateForumNotesTable();
            
            } else {

                // If something goes wrong, alert the error message that the service returned
                alert('Error: ' + response.msg);
            }
        });
    }
    else {
        // If errorCount is more than 0, error out
        alert('Please fill in Course Forum note field.');
        return false;
    }
};





