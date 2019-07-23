$(function(){
    function buildHTML(message){
        var html = `<p class="talkspace__middle__username"> ${message.name}</p>
                    <p class="talkspace__middle__time">${message.created_at}</p>
                    <p class="talkspace__middle__message">${message.body}</p>`
        return html;
    };
    $("#new_message").on('submit', function(e){
      e.preventDefault();
      var formData = new FormData(this);
      $('#submit-btn').removeAttr('data-disable-with')
      var url = $(this).attr('action')
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
          $('.talkspace__middle__message').val('');
          $this.get(0).reset();
          autoScroll();
      })
      .fail(function(){
          alert('error');
      });
      return false;
    });
  });