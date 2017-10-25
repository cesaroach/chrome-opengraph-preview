setInterval(function(){
  $('.url:not(.tooltipstered)').tooltipster({
    animation: 'fade',
    delay: 200,
    theme: 'tooltipster-light.min',
    trigger: 'hover',
    trackOrigin: true,
    maxWidth: 400,
    content: 'Loading...',
    functionBefore: function(instance, helper) {
        var origin = $(helper.origin);
        if (origin.data('loaded') !== true) {
            var URL = origin.html();
              $.ajax({
                url: URL,
                success: function(res) {
                  var twittercard = $(res).filter("meta[name='twitter:image']").attr("content");
                  var ogcard = $(res).filter("meta[property='og:image']").attr("content");
                  var title = $(res).filter("title").text();
                  var twitterDescription = $(res).filter("meta[name='twitter:description']").attr("content");
                  var ogDescription = $(res).filter("meta[property='og:description']").attr("content");

                  if (twittercard !== null && twittercard !== undefined) {
                    var $el = $("<div style='display: flex'><img src='" + twittercard + "' height='150' width='200'><div style='width: 300px; padding-left:5px'><h4 style='color: white'>" + title + "</h4><div>" + twitterDescription + "</div></div></div>");
                    //var $el = $("<p><img src='"+ twittercard +"' height='200' width='300'/> " + title + "<br>" + twitterDescription + "</p>");
                    return instance.content($el);
                  } else if (ogcard !== null && ogcard !== undefined) {
                    var $el = $("<div style='display: flex'><img src='" + ogcard + "' height='150' width='200'><div style='width: 300px; padding-left:5px'><h4 style='color: white'>" + title + "</h4><div>" + ogDescription + "</div></div></div>");
                    //var $el = $("<p><img src='"+ ogcard +"' height='200' width='300'/>"  + title + "<br>" + ogDescription +" </p>");
                    return instance.content($el);
                  } else {
                    var $el = $("<p> There is no image <br> <h4 style='color: white'>" + title + "</h4> <br>" + ogDescription + " </p>");
                    instance.content($el);
                  }
                }, 
                error: function() {
                      instance.content( "error to get card" );
                    }
              });
        }
    },
  });
}, 1000);

