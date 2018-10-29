  /*
  *  HADDOCK2.2
  *  EGI Check-in support
  */
  var settingsLocal = jQuery.extend(true, {}, settings);
  var user;
  Oidc.Log.logger = console;

  function updateManager(response, scope) {
      settingsLocal.response_type = response;
      settingsLocal.scope = scope;

      manager = new Oidc.UserManager(settingsLocal);

      Oidc.Log.logger = console;

      manager.events.addUserLoaded(function (loadedUser) {
          user = loadedUser;
      $("#username").val("egici_" + user.profile.sub);
      $("#password").val("");
      $("#username").parent().parent().hide();
      $("#password").parent().parent().hide();
      var content = $("#checkin_btn").text().replace("EGI Check-in","Reset");
      $("#checkin_btn").text(content);
      img_logo = document.createElement( "img" ),
      img_logo.src = "/sso/media/checkin.png";
      $("#checkin_btn").prepend(img_logo);
          $("#checkin_btn").attr( "onclick", "reset()" );
      });

      manager.events.addSilentRenewError(function (error) {
          console.error('error while renewing the access token', error);
      });

      manager.events.addUserSignedOut(function () {
          console.info('The user has signed out');
      });

  }

  function sso() {
    response_type = settings.response_type;
    scope = settings.scope;

    updateManager(response_type, scope);
    manager.signinPopup().catch(function (error) {
        console.error('error while logging in through the popup', error);
    });
  }

  function reset() {
    $("#username").val("");
    $("#password").val("");
    $("#username").parent().parent().show();
    $("#password").parent().parent().show();
    var content = $("#checkin_btn").text().replace("Reset","EGI Check-in");
    $("#checkin_btn").text(content);
    var img_logo = document.createElement( "img" );
    img_logo.src = "/sso/media/checkin.png";
    $("#checkin_btn").prepend(img_logo);
    $("#checkin_btn").attr( "onclick", "sso()" );
  }

  $(function() {
      $("#username").val('');
      $("#password").val('');
      // Check-in requires from secured connection
      if (location.protocol != 'https:')
      {
        location.href = 'https:' + window.location.href.substring(window.location.protocol.length);
      }
  });

