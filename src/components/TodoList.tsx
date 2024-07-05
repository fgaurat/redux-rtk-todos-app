import React, { useState } from 'react';
import { Todo } from '../core/Todo';
import { todoApi } from '../services/todoApi'



function TodoList() {
    const [newTodo, setNewTodo] = useState('');
    const { data: todos, isLoading, isError } = todoApi.useGetTodosQuery();
    const [addTodo] = todoApi.useAddTodoMutation();
    const [updateTodo] = todoApi.useUpdateTodoMutation();
    const [deleteTodo] = todoApi.useDeleteTodoMutation();    

    if (isLoading) return <div>Chargement...</div>;
    if (isError) return <div>Une erreur s'est produite</div>;

    const handleAddTodo = async () => {
        if (newTodo.trim()) {
          await addTodo({ userId: 1, title: newTodo, completed: false });
          setNewTodo('');
        }
      };
    
      const handleToggleTodo = async (todo: Todo) => {
        await updateTodo({ ...todo, completed: !todo.completed });
      };
    
      const handleDeleteTodo = async (id: number) => {
        await deleteTodo(id);
      };
    
      return (
        <div>
          <h1>Ma liste de tâches</h1>
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Nouvelle tâche"
          />
          <button onClick={handleAddTodo}>Ajouter</button>
          <ul>
            {todos?.map((todo:Todo) => (
              <li key={todo.id}>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleToggleTodo(todo)}
                />
                {todo.title}
                <button onClick={() => handleDeleteTodo(todo.id??0)}>Supprimer</button>
              </li>
            ))}
          </ul>
        </div>
      );
    }

export default TodoList