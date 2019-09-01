window.addEventListener("load", function() {
  mainDisplay.loadData();
  
});
var link = 'http://dynamic.xkcd.com/api-0/jsonp/comic/?callback=?';
var alt;
var img_link;
var title;
var comic_number;
var max_comic_number = 0;
var windowlocation = {x: 0, y:0};
var zoomed = false;
var goto_box = false;
function loadJSON(callback) {

  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open('GET', link, true); // Replace 'my_data' with the path to your file
  xobj.onreadystatechange = function () {
      if (xobj.readyState == 4 && xobj.status == "200") {
          // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
          callback(xobj.responseText);
      }
  };
  xobj.send(null);
}
var navigation = {
  handleKeydown: function(e){
      switch(e.key){
          case "ArrowLeft":
            if(!zoomed && !goto_box){
                comic_number--;
                if(comic_number >= 1){
                  link = "http://dynamic.xkcd.com/api-0/jsonp/comic/" + comic_number + "?callback=?";
                  mainDisplay.loadData();
                  mainDisplay.updateComic();
                }else{
                  comic_number = 1;
                }
            }else{
              e.preventDefault();
              windowlocation.x = windowlocation.x - 60;
              window.scroll(windowlocation.x, windowlocation.y);
            }
              break;
          case "ArrowRight":
            if(!zoomed && !goto_box){
              comic_number++;
            if(comic_number <= max_comic_number){
              link = "http://dynamic.xkcd.com/api-0/jsonp/comic/" + comic_number + "?callback=?";
              mainDisplay.loadData();
              mainDisplay.updateComic();
            }else{
              comic_number = max_comic_number;
            }
            }else{
              e.preventDefault();
              windowlocation.x = windowlocation.x + 60;
              window.scroll(windowlocation.x, windowlocation.y);
            }
              break;
          case "ArrowUp":
                if(!zoomed){
                  windowlocation.y = windowlocation.y - 10;
                  console.log(windowlocation.y);
                  window.scroll(windowlocation.x, windowlocation.y);
                }else{
                  e.preventDefault();
                  windowlocation.y = windowlocation.y - 60;
                  console.log(windowlocation.y);
                  window.scroll(windowlocation.x, windowlocation.y);
                }
                break;
          case "ArrowDown":
              if(!zoomed){
                windowlocation.y = windowlocation.y + 10;
                console.log(windowlocation.y);
                window.scroll(windowlocation.x, windowlocation.y);
              }else{
                e.preventDefault();
                windowlocation.y = windowlocation.y + 60;
                console.log(windowlocation.y);
                window.scroll(windowlocation.x, windowlocation.y);
              }
                break;
          case "Enter":
              if(!zoomed && !goto_box){
                document.getElementById("comic").style.width = "auto";
                document.getElementById("comic").style.marginTop = "0.1rem";
                document.getElementById("title-bar").style.visibility = "hidden";
                zoomed = true;
                windowlocation.x = 0;
                windowlocation.y = 0;
                window.scroll(windowlocation.x, windowlocation.y);
                console.log("Zoomed");
              }else if(goto_box){
                var new_comic = document.getElementById("comic-number-input").value;
                new_comic = Number(new_comic);
                if(new_comic == null || isNaN(new_comic)){
                  alert("The number you entered is invalid " + new_comic + ". Please select the number input option by pressing the # key. Unfortunately, number input tags are bugged in Kai OS right now.");
                  document.getElementById("comic-number-input").value = null;
                }else if(new_comic < 1 || new_comic > max_comic_number){
                  alert("The number you entered(" + new_comic + ") doesn't match any xkcd comic");
                  document.getElementById("comic-number-input").value = null;
                }else{
                  console.log("SoftRight");
                  comic_number = new_comic;
                  link = "http://dynamic.xkcd.com/api-0/jsonp/comic/" + comic_number + "?callback=?";
                  mainDisplay.loadData();
                  mainDisplay.updateComic();
                  phoneScreen.LocationBox("hide");
                  goto_box = false;
                  document.getElementById("comic-number-input").value = null;
                  document.getElementById("comic-number-input").blur();
                }
                

              }else{
                console.log("Unzoomed");
                document.getElementById("comic").style.width = "240px";
                document.getElementById("comic").style.marginTop = "2.9rem";
                document.getElementById("title-bar").style.visibility = "visible";
                zoomed = false;
                windowlocation.x = 0;
                windowlocation.y = 0;
                window.scroll(windowlocation.x, windowlocation.y);
              }
              break;

          case "SoftLeft":
              if(goto_box){
                console.log("SoftLeft");
                phoneScreen.LocationBox("hide");
                document.getElementById("comic-number-input").value = null;
                goto_box = false;
                document.getElementById("comic-number-input").blur();
              }else{
                console.log("SoftLeft");
                phoneScreen.LocationBox("show");
                goto_box = true;
                document.getElementById("comic-number-input").placeholder = comic_number;
                document.getElementById("comic-number-input").focus();
                document.getElementById("comic-number-input").focus();
              }
              break;
          case "SoftRight":
              if(goto_box){
                console.log("SoftRight");
                var random_comic = Math.floor((Math.random() * max_comic_number) + 1);
                link = "http://dynamic.xkcd.com/api-0/jsonp/comic/" + random_comic + "?callback=?";
                mainDisplay.loadData();
                mainDisplay.updateComic();
                phoneScreen.LocationBox("hide");
                goto_box = false;
                document.getElementById("comic-number-input").value = null;
                document.getElementById("comic-number-input").blur();
              }else{
                alert(alt);
              }
              break;
      }
  }
}
var phoneScreen = {
  //Updates parts of the phones screen. Opens and closes menus and other pages
  UpdateContent: function(html){
      document.getElementById("list-container").innerHTML = html;
  },
  UpdateTitleBar: function(html){
      document.getElementById("title-bar").innerHTML = html
  },
  UpdateSoftKeys: function(left, center, right){
      document.getElementById("right-softkey-item").innerHTML = right;
      document.getElementById("goto-box-header").innerHTML = center;
      document.getElementById("left-softkey-item").innerHTML = left;
  },
  ShowAlert: function(alert_text) {
      if(alert_text == null){
          return false;
      }else{
          alert(alert_text);
          return true;
      }
  },
  LocationBox: function(action){
      if (action == "show"){
          document.getElementById("goto-box").style.visibility = "visible";
              document.getElementById("middle-softkey-item").innerHTML = "<h5>Go</h5>";
              document.getElementById("right-softkey-item").innerHTML = "<h4>Random</h4>";
              document.getElementById("left-softkey-item").innerHTML = "<h4>Cancel</h4>";
              return true;
      }else if(action == "hide"){
              document.getElementById("goto-box").style.visibility = "hidden";
              document.getElementById("middle-softkey-item").innerHTML = "<h5>Zoom</h5>";
              document.getElementById("right-softkey-item").innerHTML = "<h4>Alt</h4>";
              document.getElementById("left-softkey-item").innerHTML = "<h4>Goto</h4>";
              return true;
      }else{
          console.log("Unknown action" + action);
          return false;
      }
  } 
}
var mainDisplay = {
  loadData: function (){ 
    $.getJSON(link, function(data){
    // Parse JSON string into object
    console.log(data["img"]);
    xkcd_json = data;
    comic_number = xkcd_json["num"];
    if(comic_number > max_comic_number){max_comic_number = comic_number;}
    alt = xkcd_json["alt"];
    title = xkcd_json["title"];
    img_link = xkcd_json["img"];
    mainDisplay.updateComic();
});},
  updateComic: function(edition){

    document.getElementById("comic-holder").innerHTML = "<img id='comic' src='" + img_link + "' style='margin-top: 2.9rem;margin-bottom: 3rem; height: auto; width:240px'>"; 
    var title_length = title.length;
    console.log(title + " " + title_length);
    if(title_length > 24){
      document.getElementById("title-bar").innerHTML = "<marquee scrolldelay='60'><h1>" + title + "</h1></marquee>"; 
    }else{
      document.getElementById("title-bar").innerHTML = "<h1>" + title + "</h1>"; 
    }
  }
}
function init() {
  loadJSON(function(response) {
      // Parse JSON string into object
      xkcd_json = JSON.parse(response);
      var comic_number = xkcd_json["num"];
      var alt = xkcd_json["alt"];
      var title = xkcd_json["title"];
  });
}

document.activeElement.addEventListener('keydown', navigation.handleKeydown);