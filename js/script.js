$(document).ready(function () {
  getData();

  $(document).on("click", "span.del", function () {
    var elemento = $(this);
    var idToDo = elemento.parent().attr("data-id");
    deleteItem(idToDo);
  });

  $(".insert").click(function () {
    var input = $("#nuova-voce");
    var val = input.val();
    input.val("");
    addItem(val);
  });

  $(document).on("click", "span.todo-txt", function () {
    if (!$(this).hasClass("editing")) {
      $(this).addClass("editing");
      var todo = $(this).html().trim();
      $(this).html('<input type="text" value="' + todo + '">');
      $(this).find("input").focus().select();
    }
  });

  $(document).on("keyup", ".todo-txt input", function () {
    if (event.which == 13 || event.keyCode == 13) {
      var todo = $(this).val();
      var id = $(this).closest("li").attr("data-id");
      updateItem(todo, id);
    }
  });
});

//**** funzioni ****//
function updateItem(todo, id) {
  $.ajax({
    url: "http://157.230.17.132:3020/todos/" + id,
    method: "PATCH",
    data: {
      text: todo,
    },
    success: function (risposta) {
      getData();
    },
    error: function () {
      alert("Errore");
    },
  });
}

function addItem(item) {
  $.ajax({
    url: "http://157.230.17.132:3020/todos",
    method: "POST",
    data: {
      text: item,
    },
    success: function (risposta) {
      // $(".todos").html("");
      getData();
    },
    error: function () {
      alert("Errore");
    },
  });
}

function deleteItem(id) {
  $.ajax({
    url: "http://157.230.17.132:3020/todos/" + id,
    method: "DELETE",
    success: function (risposta) {
      getData();
    },
    error: function () {
      alert("Errore");
    },
  });
}

function getData() {
  $.ajax({
    url: "http://157.230.17.132:3020/todos",
    method: "GET",
    success: function (risposta) {
      printItem(risposta);
    },
    error: function () {
      alert("Errore");
    },
  });
}

function printItem(data) {
  $(".todos").html("");
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
