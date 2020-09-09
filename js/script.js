$(document).ready(function () {
  $.ajax({
    url: "http://157.230.17.132:3020/todos",
    method: "GET",
    success: function (risposta) {
      var source = $("#entry-template").html();
      var template = Handlebars.compile(source);
      for (var i = 0; i < risposta.length; i++) {
        var context = risposta[i];

        //   var context = {
        //      text: risposta[i].text,
        //      id: risposta[i].id
        //   }

        var html = template(context);
        $(".todos").append(html);
      }
    },
    error: function () {
      alert("Errore");
    },
  });
});
