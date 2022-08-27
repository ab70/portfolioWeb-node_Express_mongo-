///////////////////////////////////////////
//  change nav location dynamically      //
//////////////////////////////////////////
 var loc = window.location.href
 $("li a").each(function(){
    if(this.href === loc){
        $(this).addClass('active')
    }
 })

$(document).ready(function(){
    var yearNow = new Date().getFullYear()
    var startYear = yearNow-50 
    
    for(var i = yearNow; i>startYear; i--){
        $('select.yearselect').append('<option value=" '+i+' ">'+ i +' </option> ');
    }

    //skill-post jquery
    
    $('#skillPost').on('click',function(event){
        event.preventDefault();
        var name = $('#skillName')  
        var percentage = $('#skillPercentage')
        var skill = {
            skillName : name.val(),
            skillLevel : percentage.val()
        }
        $.ajax({
            type: "POST",
            url: "/postSkill",
            data: skill,
            // dataType: "dataType",
            success: function () {
                console.log(data);
            }
        });
    })
    //post language
    $('#languagePost').on('click',function(event){
        event.preventDefault()
        var name = $('#langName')
        var percentage = $('#langSkillPercentage')
        var language = {
            langName : name.val(),
            langSkillPercentage : percentage.val()
        }
        $.ajax({
            type: "POST",
            url: "/postLanguage",
            data: language,
            //dataType: "dataType",
            success: function () {
                console.log('Data inserted');
            }
        });
    }) 
    
    //user registration:

    $('#registration').on('click', function (event) {
        event.preventDefault();
        var name = $('#regName')
        var pass = $('#regPass')
        var email = $('#regEmail')
        var userInfo = {
        name : name.val(),
        email : email.val(),
        pass : pass.val()
        }
        $.ajax({
            type: "POST",
            url: "/registration",
            data: userInfo,
            // dataType: "dataType",
            success: function (response) {
                if (response.status==200) {
                    $('#succalertMessage').show().fadeOut(4000);
                }
                else{
                    $('#failalertMessage').show().fadeOut(4000)
                }
        }
        });
    });

        
   
   

})



    
