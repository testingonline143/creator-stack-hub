
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AddProductFormProps {
  onAddProduct: (product: { title: string; type: string }) => void;
  onDone: () => void;
}

const AddProductForm = ({ onAddProduct, onDone }: AddProductFormProps) => {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !type) {
      // Basic validation
      return;
    }
    onAddProduct({ title, type });
    onDone();
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 py-4">
      <div className="grid gap-2">
        <Label htmlFor="title">Product Title</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Email Marketing Mastery"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="type">Product Type</Label>
        <Select onValueChange={setType} value={type}>
          <SelectTrigger id="type">
            <SelectValue placeholder="Select a type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Course">Course</SelectItem>
            <SelectItem value="Template">Template</SelectItem>
            <SelectItem value="Tool">Tool</SelectItem>
            <SelectItem value="PDF">PDF</SelectItem>
            <SelectItem value="Video">Video</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button type="submit" className="w-full">
        Add Product
      </Button>
    </form>
  );
};

export default AddProductForm;
