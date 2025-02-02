import React, { useState } from "react";
import TodoItem, { Todo } from "./TodoItem";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([
    {
      id: "1",
      text: "Build a todo list app",
      completed: false,
      tags: [{ id: "1", name: "work" }],
    },
    {
      id: "2",
      text: "Add tag management",
      completed: true,
      tags: [{ id: "2", name: "important" }],
    },
  ]);
  const [newTodo, setNewTodo] = useState("");

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([
        ...todos,
        {
          id: Date.now().toString(),
          text: newTodo.trim(),
          completed: false,
          tags: [],
        },
      ]);
      setNewTodo("");
    }
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const addTag = (todoId: string, tag: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === todoId
          ? {
              ...todo,
              tags: [...todo.tags, { id: Date.now().toString(), name: tag }],
            }
          : todo,
      ),
    );
  };

  const removeTag = (todoId: string, tagId: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === todoId
          ? { ...todo, tags: todo.tags.filter((tag) => tag.id !== tagId) }
          : todo,
      ),
    );
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6 bg-background">
      <div className="flex gap-2">
        <Input
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && addTodo()}
          placeholder="Add a new todo..."
        />
        <Button onClick={addTodo}>Add</Button>
      </div>
      <div className="space-y-4">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onAddTag={addTag}
            onRemoveTag={removeTag}
          />
        ))}
      </div>
    </div>
  );
};

export default TodoList;
