
  const Model = (() => {
    class State {
      #todos = [];
      #onChangeCb;
      #counter = -1;
      constructor() {
        this.#onChangeCb = () => {};
      }
      get todos() {
        return this.#todos;
      }

      addTodo(value) {
        const todo = { value, id: this.getId()}
        this.#todos.push(todo);
        this.#onChangeCb();
      }

      getId() {
        this.#counter++;
        return this.#counter.toString();
      }

      removeTodo(id) {
        this.#todos = this.#todos.filter((el) => el.id !== id);
        this.#onChangeCb();
      }

      subscribe = (cb) => {
        this.#onChangeCb = cb;
      };
    }
    return {
      State,
    };
  })();

  
  const View = (() => {
    const list = document.getElementById('list');
    const addTodoInput = document.getElementById('add-todo');
    const addTodoButton = document.getElementById('add-todo-button');

   const renderTodos = (todos) => {
    addTodoInput.value = '';
    let template = '';
    for (const todo of todos) {
      template += `<div class="todo"><p class="todo-value">${todo.value}</p><button class="remove" id="${todo.id}">Remove</button></div>`;
    }
    list.innerHTML = template;
   }
  
    return {
      addTodoInput,
      addTodoButton,
      list,
      renderTodos
    };
  })();
  
  const ViewModel = ((Model, View) => {
    const state = new Model.State();

    const addButtonEventListener = () => {
       View.addTodoButton.addEventListener('click', event => {
        const value = View.addTodoInput.value;
        state.addTodo(value)
       })
    }

    const removeTodoEventListener = () => {
      View.list.addEventListener('click', event => {
        const id = event.target.id;
        state.removeTodo(id);
       })
    }

    const init = () => {
     addButtonEventListener(),
     removeTodoEventListener()
      state.subscribe(() => {
        View.renderTodos(state.todos);
      });
    };
    return {
      init,
    };
  })(Model, View);
  
  ViewModel.init();