import React, { useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { X } from "lucide-react";

interface Tag {
  id: string;
  name: string;
}

interface TagManagerProps {
  tags?: Tag[];
  onAddTag?: (tag: string) => void;
  onRemoveTag?: (tagId: string) => void;
}

const TagManager = ({
  tags = [
    { id: "1", name: "important" },
    { id: "2", name: "work" },
    { id: "3", name: "personal" },
  ],
  onAddTag = () => {},
  onRemoveTag = () => {},
}: TagManagerProps) => {
  const [newTag, setNewTag] = useState("");

  const handleAddTag = () => {
    if (newTag.trim()) {
      onAddTag(newTag.trim());
      setNewTag("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAddTag();
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2 bg-background p-2 rounded-md w-full">
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Badge
            key={tag.id}
            variant="secondary"
            className="flex items-center gap-1 px-2 py-1"
          >
            {tag.name}
            <button
              onClick={() => onRemoveTag(tag.id)}
              className="hover:text-destructive"
              aria-label={`Remove ${tag.name} tag`}
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
      </div>
      <div className="flex gap-2 min-w-[200px]">
        <Input
          type="text"
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Add new tag..."
          className="h-8"
        />
        <Button
          variant="outline"
          size="sm"
          onClick={handleAddTag}
          className="h-8"
        >
          Add
        </Button>
      </div>
    </div>
  );
};

export default TagManager;
