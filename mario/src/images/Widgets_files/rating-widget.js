

    function Rating(container) {
      this.clicked = false;
      this.container = container;
      this.defaultTagName = "div";
      this.data = this.getRatingByUser();
      this.settings = {
        widget : {"class":"widget-body","attr":{"id":"widget-style-1","data-color":"blue"},"style":"'#widget-style-1.widget-body .fa-star{color:#fec963;font-size:18px;padding:0 2px }#widget-style-1.widget-body p{line-height: 15px;}#clx-rating #widget-style-1{max-width:820px;border:1px solid #959595 }#widget-style-1 .widget-stars-container .rating-stars>span{text-align:center;display:block;margin:10px 0 }#widget-style-1 .widget-coll .right-col .rating-stars{margin-right:-2px;margin-top:2px }#widget-style-1 .widget-coll .rating-in-text{display:inline-block;padding-left:5px }#widget-style-1.widget-body .slick-buttons{color:#4d4d4d;text-decoration:none;position:absolute;top:50%;z-index:999;padding:5px;width:26px;height:24px;line-height:24px;text-align:center;border-radius:100%;margin-top:-15px }#widget-style-1 .slick-buttons i{color:#fff }#widget-style-1.widget-body .slick-buttons i.fas{font-size:22px;line-height:24px }#widget-style-1.widget-body .slick-buttons:hover{background:#ececec }#widget-style-1.widget-body .slick-buttons.slick-prev{left:-36px;padding-left:3px }#widget-style-1.widget-body .slick-buttons.slick-next{right:-36px;padding-right:3px }#widget-style-1.widget-body .rating-stars .fa-star{font-size:14px }'","child":[{"tag":"a","attr":{"href":this.data.profile_url,"target":"_blank","style":"overflow: hidden;display: flex; background-color: #fff;text-decoration: none;font-size: 15px;font-family: 'Open Sans', sans-serif;align-items: center;justify-content: center;padding: 15px;"},"child":[{"class":"widget-stars-container widget-coll","attr":{"style":"float:left;width: 20%;text-decoration: none;"},"child":[{"class":"stars-number","tag":"div","attr":{"style":"text-align: center;margin: 0px;"},"text":this.data.number + ' von 5'},{"class":"stars-container","child":[{"tag":"div","class":"center-text-column","text":this.data.stars_html}]},{"tag":"div","class":"profile-name","attr":{"style":"text-align: center;"},"text":this.data.url_text}]},{"class":"widget-img widget-coll center-text-column","tag":"div","attr":{"style":"float:left;width: 20%;text-align: center;height: auto;"},"child":[{"tag":"img","attr":{"src":this.data.images[0],"style":"width: auto;max-width: 100%;"}}]},{"class":"widget-img widget-coll","tag":"div","attr":{"style":"float:left;width: 60%;max-height: 115px; overflow:hidden;"},"text":this.data.comment}]}]},
        json_ltd: {
          tag : "script",
          attr: {
            type : "application/ld+json"
          },
        },
        selectors : {
          stars: "star",
          active: "active",
          inactive: "inactive",
        },
        info : {
          stars: {
            active : "&#9733;",
            inactive : "&#9734;",
            half: "half",
            on: "on"
          },
          css : [
            "http://yably.loc/modules/custom/cylex_rating_widget/css/rating-widget-1.css",
            "http://yably.loc/modules/custom/cylex_rating_widget/css/fonts.googleapis.com.css",
            "http://netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap-glyphicons.css",
            "https://use.fontawesome.com/releases/v5.7.2/css/all.css",
          ],
          user_id_attr : "user-id"
        }
      };
      this.init();
    }



    Rating.prototype.createJsonLtd = function() {
      var script = document.createElement("script");
      script.type = "application/ld+json";
      if(this.data.jsonLTD) {
        script.appendChild(document.createTextNode(JSON.stringify(this.data.jsonLTD)));
        document.head.appendChild(script);
      }
    }

  Rating.prototype.getRatingByUser = function() {
    var data = JSON.parse('{"nid":"390587","id":"d1c4a45f-1dd9-4f01-8531-252cd596e3cb","profile_url":"http:\/\/yably.loc\/reviews\/berlin\/blech-company-kg-karosseriebau-meisterbetrieb-lehderstr-39-41","stars":"4.53","number":"4.53","reviewCount":"29","url_text":"29 Bewertungen","title":"Blech Company KG Karosseriebau-Meisterbetrieb","logo_text":"Yably","footer_text":"Vertrauenspartner","stars_html":"<div data-value=\\\"4.53\\\" class=\\\"rating-stars\\\"><\/div>","page_local":false,"images":["http:\/\/yably.loc\/modules\/custom\/cylex_rating_widget\/images\/badge_widget.png"],"comment":"<div class=\\\"comment-slider\\\" style=\\\"margin: 0px 35px;\\\">      <div class=\\\"review-slide\\\" style=\\\"max-height:115px;overflow:hidden;\\\">      <div class=\\\"user-first-col\\\" style=\\\"border-radius: 100%;float: left;width:50px;height:50px;background-color:#fff;\\\">      <svg width=\\\"50\\\" height=\\\"50\\\" data-jdenticon-value=DrMertens><\/svg><\/div>      <div class=\\\"review-info\\\" style=\\\"overflow: hidden;padding-left: 10px;\\\">        <div class=\\\"left-col\\\" style=\\\"float: left;\\\">          <div class=\\\"dark-text\\\" style=\\\"font-weight: 600;\\\">DrMertens<\/div>          <span style=\\\"font-size: 13px;\\\">Source: Cylex | <\/span>          <span style=\\\"font-size: 13px;\\\">16.06.2014<\/span>        <\/div>        <div class=\\\"right-col dark-text\\\" style=\\\"overflow: hidden; text-align: right; font-size: 14px;\\\">          <span class=\\\"text-wrapper rating-bg5\\\"><span class=\\\"big-font\\\">5<\/span><span class=\\\"small-font\\\">\/5<\/span><\/span><div class=\\\"rating-in-text\\\">Very good<\/div><div data-value=\\\"5\\\" class=\\\"rating-stars\\\"><\/div>        <\/div>      <\/div>      <p style=\\\"margin-bottom: 0;clear: both;margin: 0;padding-left: 60px;font-size: 15px;font-family: Open Sans, sans-serif;color: #767676;\\\">                Sehr guter Service und qualitative Arbeit. Die Reparatur meines Fahrzeugs wurde sehr kurzfristig ein...      <\/p>    <\/div>      <div class=\\\"review-slide\\\" style=\\\"max-height:115px;overflow:hidden;\\\">      <div class=\\\"user-first-col\\\" style=\\\"border-radius: 100%;float: left;width:50px;height:50px;background-color:#fff;\\\">      <svg width=\\\"50\\\" height=\\\"50\\\" data-jdenticon-value=MartinP.><\/svg><\/div>      <div class=\\\"review-info\\\" style=\\\"overflow: hidden;padding-left: 10px;\\\">        <div class=\\\"left-col\\\" style=\\\"float: left;\\\">          <div class=\\\"dark-text\\\" style=\\\"font-weight: 600;\\\">MartinP.<\/div>          <span style=\\\"font-size: 13px;\\\">Source: Cylex | <\/span>          <span style=\\\"font-size: 13px;\\\">11.02.2014<\/span>        <\/div>        <div class=\\\"right-col dark-text\\\" style=\\\"overflow: hidden; text-align: right; font-size: 14px;\\\">          <span class=\\\"text-wrapper rating-bg5\\\"><span class=\\\"big-font\\\">5<\/span><span class=\\\"small-font\\\">\/5<\/span><\/span><div class=\\\"rating-in-text\\\">Very good<\/div><div data-value=\\\"5\\\" class=\\\"rating-stars\\\"><\/div>        <\/div>      <\/div>      <p style=\\\"margin-bottom: 0;clear: both;margin: 0;padding-left: 60px;font-size: 15px;font-family: Open Sans, sans-serif;color: #767676;\\\">                Sehr freundlich und kompetent wurde mir beim Unfallschaden (Kotfl\u00fcgel hinten rechts) an meinem VW Pa...      <\/p>    <\/div>      <div class=\\\"review-slide\\\" style=\\\"max-height:115px;overflow:hidden;\\\">      <div class=\\\"user-first-col\\\" style=\\\"border-radius: 100%;float: left;width:50px;height:50px;background-color:#fff;\\\">      <svg width=\\\"50\\\" height=\\\"50\\\" data-jdenticon-value=Felix Schmied><\/svg><\/div>      <div class=\\\"review-info\\\" style=\\\"overflow: hidden;padding-left: 10px;\\\">        <div class=\\\"left-col\\\" style=\\\"float: left;\\\">          <div class=\\\"dark-text\\\" style=\\\"font-weight: 600;\\\">Felix Schmied<\/div>          <span style=\\\"font-size: 13px;\\\">Source: Cylex | <\/span>          <span style=\\\"font-size: 13px;\\\">05.04.2011<\/span>        <\/div>        <div class=\\\"right-col dark-text\\\" style=\\\"overflow: hidden; text-align: right; font-size: 14px;\\\">          <span class=\\\"text-wrapper rating-bg5\\\"><span class=\\\"big-font\\\">5<\/span><span class=\\\"small-font\\\">\/5<\/span><\/span><div class=\\\"rating-in-text\\\">Very good<\/div><div data-value=\\\"5\\\" class=\\\"rating-stars\\\"><\/div>        <\/div>      <\/div>      <p style=\\\"margin-bottom: 0;clear: both;margin: 0;padding-left: 60px;font-size: 15px;font-family: Open Sans, sans-serif;color: #767676;\\\">                Habe hier die Radl\u00e4ufe meines Autos umb\u00f6rdeln lassen und mein Nummernschild &quot;cleanen&quot; lass...      <\/p>    <\/div>  <\/div>","jsonLTD":{"@context":"http:\/\/schema.org","@type":"LocalBusiness","@id":"390587","name":"Blech Company KG Karosseriebau-Meisterbetrieb","url":"http:\/\/yably.loc\/reviews\/berlin\/blech-company-kg-karosseriebau-meisterbetrieb-lehderstr-39-41","image":["http:\/\/yably.loc\/modules\/custom\/cylex_rating_widget\/images\/badge_widget.png"],"aggregateRating":{"@type":"AggregateRating","worstRating":"1","bestRating":"5","ratingValue":"4.53","reviewCount":"29","sameAs":"http:\/\/yably.loc\/reviews\/berlin\/blech-company-kg-karosseriebau-meisterbetrieb-lehderstr-39-41"}}}');
    console.log(data);
    return data;
  }

  Rating.prototype.init = function() {
    this.createJsonLtd();
    this.createWidget();
  }

  Rating.prototype.addCss = function() {
    var urlCss = this.settings.info.css;

    for(var i in urlCss)
    if (urlCss[i] !== "") {
      var $css = document.createElement("link");
      $css.type = "text/css";
      $css.rel  = "stylesheet";
      $css.href = urlCss[i];
      document.getElementsByTagName("head")[0].appendChild($css);
    }
  }

  Rating.prototype.createWidget = function() {
    var widget = this.createElement(this.settings.widget);
    this.container.append(widget);
    this.addCss();
  }

  Rating.prototype.addAndRemoveClass = function(element, add, remove) {
    $(element).removeClass(remove);
    $(element).addClass(add);
  }

  Rating.prototype.createElementChildrens = function(htmlElement, childs) {
    for(var i in childs ) {
      if(childs[i].count) {
        for(var j = 1; j <= childs[i].count; j++) {
          //childs[i].attr.data = j;
          htmlElement.append(this.createElement(childs[i]));
        }
      }
      else{
        htmlElement.append(this.createElement(childs[i]));
      }
    }
  }

  Rating.prototype.createElement = function(element) {
    var htmlElement = $("<" + this.defaultTagName + ">");
      if(element["tag"])
        htmlElement = $("<" + element["tag"] + ">");
      if(element.class) {
        htmlElement.addClass(element.class);
      }

      if(element.text) {
        htmlElement.html(element.text);
      }

      if(element.style) {
        htmlElement.html('<style>' + element.style.substr(1, element.style.length-2) + '</style>');
      }

      if(element.event) {
        this.eventsHelperClass[element.event](htmlElement, this.cutsomClass);
      }

      if(element["attr"]) {
        for(var attr in element["attr"])
          htmlElement.attr(attr, element["attr"][attr]);
      }

      if(element.child) {
        this.createElementChildrens(htmlElement, element.child);
      }
    return htmlElement;
  }



if(document.getElementsByClassName("widget-body").length == 0) {
  var urljs = "http://yably.loc/modules/custom/cylex_rating_widget/js/3.3.1.jquery.min.js";
  var $js = document.createElement("script");
  $js.src = urljs;
  document.getElementsByTagName("head")[0].appendChild($js);



  $js.onload  = function() {

    (function ($) {
        if (1 == 1 ) {
          if (document.getElementById("slickjs") != null) {
           document.getElementById("slickjs").remove();
          }

          var $jsSlider = document.createElement("script");
          $jsSlider.src = "http://yably.loc/modules/custom/cylex_rating_widget/js/slick.min.js";
          $jsSlider.id = "slickjs";
          document.getElementsByTagName("head")[0].appendChild($jsSlider);

          $jsSlider.onload = function() {
            try {
              $(".comment-slider").slick({
                autoplay: true,
                autoplaySpeed: 5000,
                prevArrow: '<a href="#" class="slick-buttons slick-prev"><i class="fas fa-chevron-left"></i></a>',
                nextArrow: '<a href="#" class="slick-buttons slick-next"><i class="fas fa-chevron-right"></i></a>'
              });
            } catch (err) {}
          }
        }
        var $jsRating = document.createElement("script");
        $jsRating.src = "http://yably.loc/modules/custom/cylex_rating_widget/js/bootstrap-rating.min.js";
        document.getElementsByTagName("head")[0].appendChild($jsRating);

        if($(".widget-body").length == 0) {

          new Rating($("#clx-rating"));

          $(".rating-stars").each(function(){
              var rounded_rating_value = Math.round($(this).attr("data-value"));

              $rating = $("<input />")
                .addClass("rating")
                .attr("type", "hidden")
                .attr("disabled", "disabled")
                .attr("data-fractions", "2")
                .attr("data-filled", "star-icon glyphicon glyphicon-star")
                .attr("data-empty", "star-icon glyphicon glyphicon-star star-empty")
                .attr("value",  $(this).attr("data-value"));

              $(this).html($rating);
          });

          $(document).ready(function() {
            var $jsJdenticon = document.createElement("script");
            $jsJdenticon.src = "http://yably.loc/modules/custom/cylex_rating_widget/js/jdenticon-2.1.1.min.js";
            if (1 == 1) {
              document.getElementsByTagName("body")[0].appendChild($jsJdenticon);

            }
          });
      }



      

    })(jQuery);
  }
}

 
      var scripts = [
        "http://yably.loc/modules/custom/cylex_rating_widget/css/slick.css",
      ];
      for(var i in scripts)
        if (scripts[i] !== "") {
          var $link = document.createElement("link");
          $link.type = "text/css";
          $link.rel  = "stylesheet";
          $link.href = scripts[i];
          document.getElementsByTagName("head")[0].appendChild($link);
        }

    