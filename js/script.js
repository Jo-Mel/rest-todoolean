$(document).ready(function () {
  getData();
});

//**** funzioni ****/
function getData() {
  $.ajax({
    url: "http://157.230.17.132:3020/todos",
    method: "GET",
    success: function (risposta) {
      getItem(risposta);
    },
    error: function () {
      alert("Errore");
    },
  });
}

function getItem(data) {
  var source = $("#entry-template").html();
  var template = Handlebars.compile(source);
  for (var i = 0; i < data.length; i++) {
    var context = data[i];

    //   var context = {
    //      text: data[i].text,
    //      id: data[i].id
    //   }

    var html = template(context);
    $(".todos").append(html);
  }
}
