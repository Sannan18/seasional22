$(function() {
  loadRecipies();
  $("#users").on("click", ".btn-danger", handleDelete);
  $("#users").on("click", ".btn-warning", handleUpdate);
  $("#addBtn").click(addRecipe);
  $("#updateSave").click(function() {
    var id = $("#updateId").val();
    var name = $("#updateName").val();
    var email = $("#updateEmail").val();
    if(!email.includes(".com") || !email.includes("@"))
    {
      $("#updateHelpId").val("Incorrect Email, must contain @ and .com");
      return;
    }
    $.ajax({
      url: "https://jsonplaceholder.typicode.com/users/" + id,
      data: { name, email },
      method: "PUT",
      success: function(response) {
        console.log(response);
        loadRecipies();
        $("#updateModal").modal("hide");
      }
    });
  });
});
function handleUpdate() {
  var btn = $(this);
  var parentDiv = btn.closest(".recipe");
  let id = parentDiv.attr("data-id");
  $.get("https://jsonplaceholder.typicode.com/users/" + id, function(
    response
  ) {
    $("#updateId").val(response.id);
    $("#updateName").val(response.name);
    $("#updateEmail").val(response.email);
    $("#updateModal").modal("show");
  });
}
function addRecipe() {
  var name = $("#title").val();
  var email = $("#body").val();

  if(!email.includes(".com") || !email.includes("@"))
  {
    $("#emailHelp").val("Incorrect Email, must contain @ and .com");
    return;
  }
  $.ajax({
    url: "https://jsonplaceholder.typicode.com/users",
    method: "POST",
    data: { name, email },
    success: function(response) {
      console.log(response);
      $("#title").val("");
      $("#body").val("");
      loadRecipies();
      $("#addModal").modal("hide");
    }
  });
}
function handleDelete() {
  var btn = $(this);
  var parentDiv = btn.closest(".recipe");
  let id = parentDiv.attr("data-id");
  console.log(id);
  $.ajax({
    url: "https://jsonplaceholder.typicode.com/users/" + id,
    method: "DELETE",
    success: function() {
      loadRecipies();
    }
  });
}
function loadRecipies() {
  $.ajax({
    url: "https://jsonplaceholder.typicode.com/users",
    method: "GET",
    error: function(response) {
      var users = $("#users");
      users.html("An Error has occured");
    },
    success: function(response) {
      console.log(response);
      var users = $("#users");
      users.empty();
      for (var i = 0; i < response.length; i++) {
        var rec = response[i];
        users.append(
          `<div class="recipe" data-id="${rec.id}"><h3>${rec.name}</h3><p><button class="btn btn-danger btn-sm float-right">delete</button><button class="btn btn-warning btn-sm float-right">Edit</button> ${rec.email}</p></div>`
        );
        // users.append("<div><h3>" + rec.title + "</h3></div>");
      }
    }
  });
}
