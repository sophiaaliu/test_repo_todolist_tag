import React, { useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { X } from "lucide-react";

interface Tag {
  id: string;
  name: string;
  color?: string;
}

const TAG_COLORS = [
  "bg-red-100 text-red-800 border-red-200",
  "bg-blue-100 text-blue-800 border-blue-200",
  "bg-green-100 text-green-800 border-green-200",
  "bg-yellow-100 text-yellow-800 border-yellow-200",
  "bg-purple-100 text-purple-800 border-purple-200",
  "bg-pink-100 text-pink-800 border-pink-200",
  "bg-indigo-100 text-indigo-800 border-indigo-200",
];

interface TagManagerProps {
  tags?: Tag[];
  onAddTag?: (tag: string) => void;
  onRemoveTag?: (tagId: string) => void;
}

const TagManager = ({
  tags = [
    { id: "1", name: "important", color: TAG_COLORS[0] },
    { id: "2", name: "work", color: TAG_COLORS[1] },
    { id: "3", name: "personal", color: TAG_COLORS[2] },
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
            className={`flex items-center gap-1 px-2 py-1 border ${tag.color || "bg-gray-100 text-gray-800 border-gray-200"}`}
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
