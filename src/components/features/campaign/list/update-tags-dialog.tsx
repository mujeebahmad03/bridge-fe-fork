"use client";

import { useEffect, useState } from "react";
import { PlusIcon } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { TagBadge } from "./table/tag-badge";
import { api } from "@/data/campaign-dashboard";

interface UpdateTagsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  campaignIds: string[];
  onSuccess: () => void;
  initialTags?: string[];
}

export function UpdateTagsDialog({
  open,
  onOpenChange,
  campaignIds,
  onSuccess,
  initialTags = [],
}: UpdateTagsDialogProps) {
  const [tags, setTags] = useState<string[]>(initialTags);
  const [inputValue, setInputValue] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [suggestedTags, setSuggestedTags] = useState<string[]>([]);

  useEffect(() => {
    if (open) {
      // Load suggested tags when dialog opens
      api.getTags().then((tags) => {
        setSuggestedTags(tags.map((tag) => tag.name));
      });
    }
  }, [open]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const addTag = (tag: string) => {
    const trimmedTag = tag.trim();
    if (trimmedTag && !tags.includes(trimmedTag)) {
      setTags([...tags, trimmedTag]);
    }
    setInputValue("");
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue) {
      e.preventDefault();
      addTag(inputValue);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (inputValue) {
      addTag(inputValue);
    }

    try {
      setIsSubmitting(true);
      await api.updateCampaignTags(campaignIds, tags);
      toast.success(`Tags updated for ${campaignIds.length} campaign(s)`);
      onSuccess();
      onOpenChange(false);
    } catch (error) {
      toast.error("Failed to update tags");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get suggested tags that aren't already selected
  const filteredSuggestions = suggestedTags.filter(
    (tag) =>
      !tags.includes(tag) &&
      tag.toLowerCase().includes(inputValue.toLowerCase()),
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="animate-scale-in sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Update tags</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-3">
            <p className="text-sm text-muted-foreground">
              Update the tags you want to these {campaignIds.length} campaigns
            </p>

            <div className="flex min-h-10 flex-wrap gap-2 rounded-md border bg-background p-2">
              {tags.map((tag) => (
                <TagBadge
                  key={tag}
                  name={tag}
                  onRemove={() => removeTag(tag)}
                />
              ))}
              <div className="min-w-[100px] flex-1">
                <Input
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  placeholder="Type a tag and press Enter..."
                  className="h-7 border-0 px-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </div>
            </div>

            {inputValue && filteredSuggestions.length > 0 && (
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground">Suggestions:</p>
                <div className="flex flex-wrap gap-2">
                  {filteredSuggestions.slice(0, 5).map((suggestion) => (
                    <Button
                      key={suggestion}
                      type="button"
                      variant="outline"
                      size="sm"
                      className="h-7 text-xs"
                      onClick={() => addTag(suggestion)}
                    >
                      <PlusIcon className="mr-1 h-3 w-3" />
                      {suggestion}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {inputValue &&
              !filteredSuggestions.some(
                (s) => s.toLowerCase() === inputValue.toLowerCase(),
              ) && (
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>&quot;{inputValue}&quot; does not exist</span>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="h-7 text-xs"
                    onClick={() => addTag(inputValue)}
                  >
                    <PlusIcon className="mr-1 h-3 w-3" />
                    Create tag &quot;{inputValue}&quot;
                  </Button>
                </div>
              )}
          </div>

          <DialogFooter className="flex justify-between sm:justify-between">
            <Button
              type="button"
              variant="ghost"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              Update tags
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
