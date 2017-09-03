const url = 'http://localhost:3000'

var onloadCallback = function() {
  widgetId1 = grecaptcha.render('captcha', {
    'sitekey' : '6Lc8LS8UAAAAAE8RJanGcicPYe1Ukq97qOizv6cG',
    'theme' : 'light'
  });

  widgetRegister= grecaptcha.render('captchaRegister', {
    'sitekey' : '6Lc8LS8UAAAAAE8RJanGcicPYe1Ukq97qOizv6cG',
    'theme' : 'light'
  });
};

$('form.form-register').submit(eventHandler=>{
  eventHandler.preventDefault()
  if (!grecaptcha.getResponse(widgetRegister)) {
    return alert('Register harus checlist captcha')
  }
  $.ajax({
    url: `${url}/users/signup`,
    type: 'POST',
    data: {
      username: $('#register-username').val(),
      password: $('#register-password').val(),
      email: $('#register-email').val()
    },
    success: function(response){
      $('#register-status').empty()
      $('#register-status').append(`${response.message}`)
    }
  })
})

$('form.form-signin').submit(eventHandler=>{
  eventHandler.preventDefault()
  if (grecaptcha.getResponse(widgetId1)) {
    $.ajax({
      url: `${url}/users/signin`,
      type: 'POST',
      data: {
        username: $('#signin-username').val(),
        password: $('#signin-password').val()
      },
      success: function(response){
        console.log(response);
        if (response.hasOwnProperty('errors')) {
          $('#signin-status').fadeOut('fast')
          $('#signin-status').empty()
          $('#signin-status').append(`${response.message}`)
          $('#signin-status').fadeIn('slow')
          grecaptcha.reset(widgetId1)
        } else {
          alert('Login success')
          localStorage.setItem('adatodotoken', response.token)
          window.location.href = "/todo.html"
        }
      }
    })
  } else {
    alert('captcha harus terisi')
  }
})


// Smooth scrolling using jQuery easing
$('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
  if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
    var target = $(this.hash);
    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
    if (target.length) {
      $('html, body').animate({
        scrollTop: target.offset().top
      }, 1000, "easeInOutExpo");
      return false;
    }
  }
});

function checkFbLogin() {
  FB.getLoginStatus(function(response) {
    //console.log('get login response',response);
    if (response.status === 'connected') {
      //console.log('fb Sudah login');
      localStorage.setItem('fbaccesstoken', response.authResponse.accessToken)
      $('#fb-signin-status').empty().append(`Sudah login`)
      FbSignin()
    } else {
      fbLogin()
    }
  });
}

function fbLogin() {

  FB.login((response)=>{
    //console.log('fb login reponse', response);
    if(response.authResponse) {
      localStorage.setItem('fbaccesstoken', response.authResponse.accessToken)
      $('#fb-signin-status').empty().append(`Berhasil login`)
      FbSignin()
    } else {
      //console.log('User canceled to login');
      $('#fb-signin-status').empty().append(`User canceled to login `)
    }
  },{scope: "public_profile,email,publish_actions"})
}

window.fbAsyncInit = function() {
  FB.init({
    appId      : '113050339370015',
    cookie     : true,  // enable cookies to allow the server to access
                        // the session
    xfbml      : true,  // parse social plugins on this page
    version    : 'v2.8' // use graph api version 2.8
  });
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
};


// This is called with the results from from FB.getLoginStatus().
function statusChangeCallback(response) {
  console.log('statusChangeCallback',response);
  if (response.status === 'connected') {
    // Logged into your app and Facebook.\
    localStorage.setItem('fbaccesstoken', response.authResponse.accessToken)
  } else {
    // The person is not logged into your app or we are unable to tell.
    // document.getElementById('fb-signin-status').innerHTML = 'Please log ' +
    //   'into this app.';
  }
}


function FbSignin() {
  axios.get(`${url}/users/signin/facebook`,{
    headers: {
      fbaccesstoken: localStorage.getItem('fbaccesstoken')
    }
  })
  .then((response)=>{
    console.log(`response from server`,response);
    if (response.data.hasOwnProperty('errors')) {
      $('#fb-signin-status').fadeOut('fast')
      $('#fb-signin-status').empty()
      $('#fb-signin-status').append(`${response.data.message}`)
      $('#fb-signin-status').fadeIn('slow')
    } else {
      alert('Login success')
      localStorage.setItem('adatodotoken', response.data.token)
      window.location.href = "/todo.html"
    }
  })
}

// Load the SDK asynchronously
(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
