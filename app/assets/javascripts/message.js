$(function(){
    function buildHTML(message){
        image = ( message.image ) ? `<img class= "talkspace__bottom__message__form__photo" src=${message.image} >` : "";
        var html = `<div class="talkspace__middle" data-message-id="${message.id}">
                    <p class="talkspace__middle__username"> ${message.name}</p>
                    <p class="talkspace__middle__time">${message.created_at}</p>
                    <p class="talkspace__middle__message">${message.body}</p>
                    ${image}
                    </div>`
        return html;
    };
    $("#new_message").on('submit', function(e){
      e.preventDefault();
      var formData = new FormData(this);
      $('#submit-btn').removeAttr('data-disable-with');
      var url = $(this).attr('action');
      $.ajax({
          url:  url,
          type: "POST",
          data: formData,
          dataType: 'json',
          processData: false,
          contentType: false
      })
      .done(function(data){
          var html = buildHTML(data);
          $('.talkspace__middle').append(html);
          $("#new_message")[0].reset();
          $('.talkspace__middle').animate({scrollTop: $('.talkspace__middle')[0].scrollHeight}, 'fast');
          
      })
      .fail(function(){
          alert('error');
      });
      return false;
    });
    var reloadMessages = function() {
        if (window.location.href.match(/\/groups\/\d+\/messages/)){
        last_message_id = $('.talkspace__middle:last').data('message-id');
        $.ajax({
          url: location.href,
          type: 'get',
          dataType: 'json',
          data: {id: last_message_id}
        })
        .done(function(data){
            var insertHTML = '';
            data.forEach(function(message){
            insertHTML = buildHTML(message);         
            $('.talkspace__middle').append(insertHTML)
            ScrollToNewMessage();
            });
          })
        .done(function(messages) {
          console.log('success');
        })
        .fail(function() {
          console.log('error');
        });
        } else{
        setInterval(reloadMessages, 5000);
        };
    }
  });