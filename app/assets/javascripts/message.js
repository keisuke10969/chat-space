$(function(){
    function buildHTML(message){
        var image = message.image ? `<img class= "photo" src= ${message.image.url} >` : "";
        var html = `<div class="talkspace__middle-box" data-message-id="${message.id}">
                    <p class="talkspace__middle__username"> ${message.user_name}</p>
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
          url: 'api/messages',
          type: 'get',
          dataType: 'json',
          data: {id: last_message_id}
        })
        .done(function(data){
            var insertHTML = '';
            data.forEach(function(message){
            insertHTML = buildHTML(message);         
            $('.talkspace__middle').append(insertHTML);
            });
          })
        .done(function(messages) {
          alert('success');
        })
        .fail(function() {
          alert('error');
        });
        } else{
        setInterval(reloadMessages, 5000);
        };
    };
  });