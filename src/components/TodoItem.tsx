import React from "react";
import { Checkbox } from "./ui/checkbox";
import TagManager from "./TagManager";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  tags: { id: string; name: string }[];
}

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onAddTag: (todoId: string, tag: string) => void;
  onRemoveTag: (todoId: string, tagId: string) => void;
}

const TodoItem = ({
  todo,
  onToggle,
  onDelete,
  onAddTag,
  onRemoveTag,
}: TodoItemProps) => {
  return (
    <div className="flex items-start gap-4 p-4 bg-card rounded-lg border">
      <Checkbox
        checked={todo.completed}
        onCheckedChange={() => onToggle(todo.id)}
        className="mt-1"
      />
      <div className="flex-1">
        <p
          className={`mb-2 ${todo.completed ? "line-through text-muted-foreground" : ""}`}
        >
          {todo.text}
        </p>
        <TagManager
          tags={todo.tags}
          onAddTag={(tag) => onAddTag(todo.id, tag)}
          onRemoveTag={(tagId) => onRemoveTag(todo.id, tagId)}
        />
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onDelete(todo.id)}
        className="text-destructive hover:text-destructive hover:bg-destructive/10"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default TodoItem;
