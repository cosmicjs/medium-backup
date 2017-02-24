$(function() {
  $('.feed-url').focus();
  initDeleteRow();
  $('.add-new-cron').on('click', function() {
    var row = '<tr class="feed-row">';
      row += '<td>'
      row += '<input class="form-control input-lg title" name="title" placeholder="Publication Title">';
      row += '</td>';
      row += '<td>'
      row += '<input class="form-control input-lg feed-url" name="feed_url" placeholder="https://medium.com/feed/@yourusername">';
      row += '</td>';
      row += '<td>';
      row += '<input class="form-control input-lg bucket-slug" name="bucket_slug" placeholder="my-bucket-slug">';
      row += '</td>';
      row += '<td>';
      row += '<button class="btn btn-raised delete-row" type="button">&times;</button>';
      row += '</td>';
    row += '</tr>';
    $('.crons').append(row);
    $('.crons').find('.title').last().focus();
    initDeleteRow();
  });
  function initDeleteRow() {
    $('.delete-row').on('click', function() {
      var slug = $(this).data('slug');
      $(this).closest('.feed-row').fadeOut(function() {
        if (!slug) {
          $(this).remove();
          return;
        }
        $.ajax({
          url: '/delete-cron',
          method: 'post',
          contentType: 'application/json',
          data: JSON.stringify({ slug: slug }),
          success: function(data) {
            $(this).remove();
          }
        });
      });
    });
  }
  $('#import_posts').on('submit', function() {
    $('.import-message').html('');
    var _this = $(this);
    $(this).find('.feed-url, .submit-feed-url').addClass('disabled');
    $(this).find('.submit-feed-url').text('Submitting...');
    var data = $(this).serializeFormJSON();
    $.ajax({
      url: '/import-posts',
      method: 'post',
      contentType: 'application/json',
      data: JSON.stringify(data),
      success: function(data) {
        $('.import-message').html('<div class="alert alert-success">Success!  Imported ' + data.posts.length + ' posts to ' + data.bucket_slug + '.</div>');
        $('#import_posts').remove();
        $('#posts').append('<h2>Posts imported</h2>');
        data.posts.forEach(function(post) {
          $('#posts').append('<div>' + post.title + '</div>');
        });
      },
      error: function(data) {
        var message;
        if (data.responseJSON.error === 'permission') {
          message = 'Permission issue';
        }
        if (data.responseJSON.error === 'feed_url') {
          message = 'Feed URL issue';
        }
        _this.find('.feed-url, .submit-feed-url').removeClass('disabled');
        _this.find('.submit-feed-url').text('Submit');
        $('.message').html('<div class="alert alert-danger">There was an error with this request. Error type: ' + message + '</div>');
      }
    });
    return false;
  });
  $('#add_crons').on('submit', function() {
    $('.add-crons-message').html('');
    var _this = $(this);
    $(this).find('.feed-url, .submit-feed-url').addClass('disabled');
    $(this).find('.submit-feed-url').text('Submitting...');
    var crons = [];
    $('.feed-row').each(function() {
      var feed_url = $(this).find('.feed-url').val();
      var bucket_slug = $(this).find('.bucket-slug').val();
      var title = $(this).find('.title').val();
      var id = $(this).data('id');
      // Test if existing
      if (!id) {
        crons.push({
          feed_url: feed_url,
          bucket_slug: bucket_slug,
          title: title
        });
      }
    });
    $.ajax({
      url: '/add-crons',
      method: 'post',
      contentType: 'application/json',
      data: JSON.stringify(crons),
      success: function(data) {
        _this.find('.feed-url, .submit-feed-url').removeClass('disabled');
        _this.find('.submit-feed-url').text('Submit');
        $('.add-crons-message').html('<div class="alert alert-success">Success!  Crons added!</div>');
      },
      error: function(data) {
        var message;
        if (data.responseJSON.error === 'permission') {
          message = 'Permission issue';
        }
        if (data.responseJSON.error === 'feed_url') {
          message = 'Feed URL issue';
        }
        _this.find('.feed-url, .submit-feed-url').removeClass('disabled');
        _this.find('.submit-feed-url').text('Submit');
        $('.add-crons-message').html('<div class="alert alert-danger">There was an error with this request. Error type: ' + message + '</div>');
      }
    });
    return false;
  });
  (function ($) {
    $.fn.serializeFormJSON = function () {
      var o = {};
      var a = this.serializeArray();
      $.each(a, function () {
        if (o[this.name]) {
          if (!o[this.name].push) {
            o[this.name] = [o[this.name]];
          }
          o[this.name].push(this.value || '');
        } else {
          o[this.name] = this.value || '';
        }
      });
      return o;
    };
  })(jQuery);
});