$(window).ready(function(){
	todoDB.open(refreshTodos);
	
	var newTodoForm = $('#new-todo-form');
	var newTodoInput = $('#new-todo');
	
	newTodoForm.submit(function(){
		var text = newTodoInput.val();
		if (text.replace(/ /g,'') != '') {
			todoDB.createTodo(text, function(todo) {
				refreshTodos();
			});
		}
		newTodoInput.val('');
		return false;
	})

	function refreshTodos() {  
		todoDB.fetchTodos(function(todos) {
			
			var todoList = $('#todo-items');
			todoList.html('');
			
			for(var i = 0; i < todos.length; i++) {
				// Read the todo items backwards (most recent first).
				var todo = todos[(todos.length - 1 - i)];
				
				var li = $('<li id="todo-'+todo.timestamp+'"></li>');
				var deletebtn = $('<div class="btnDelete" data-id="'+todo.timestamp+'"></div>');
				
				li.append(deletebtn);
				
				var span = $('<span>'+todo.text+'</span>');
				
				li.append(span);
				
				todoList.append(li);
				
				deletebtn.click(function(e) {
					var id = parseInt(e.target.getAttribute('data-id'));	
					todoDB.deleteTodo(id, refreshTodos);
				});
			}
		});
	}
});