console.log('dizaua')
$(document).ready(function(){

   window.fbAsyncInit = function() {
     FB.init({
       appId      : '246073409146198',
       xfbml      : true,
       version    : 'v2.7'

     });
     FB.Canvas.setAutoGrow();

     function onLogin(response) {
       if (response.status == 'connected') {
         FB.api('/me?fields=id,name,first_name,last_name,birthday,gender,age_range,email', function(data) {
           if( data.id ){
             const id = data.id
             const name= data.first_name ;
             const surname = data.last_name;
             const email = data.email;
             $('#name').val(name + ' ' + surname);
             $('#email').val(email);
             $('#social').val('https://www.facebook.com/' + id);
           }
         });
       }
     }

     FB.getLoginStatus(function(response) {
       // Check login status on load, and if the user is
       // already logged in, go directly to the welcome message.
       if (response.status == 'connected') {
         onLogin(response);
       } else {
         // Otherwise, show Login dialog first.
         FB.login(function(response) {
           onLogin(response);
         }, {scope: 'user_friends, email'});
       }
     });
   };

   (function(d, s, id){
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {return;}
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

    $('#sendEmail').on('click', function(){
      $.ajax({
        url: "https://formspree.io/bartekgladys@gmail.com",
        method: "POST",
        data: {imie: $('#name').val(), email: $('#email').val(), telefon: $('#phone').val(), link: $("#social").val(), opis: $("#about").val() },
        dataType: "json"
      })
    })

})
