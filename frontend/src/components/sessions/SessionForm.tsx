import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Session, SessionCreateData } from "@/api/services/sessionService";

interface SessionFormProps {
  initialData?: Partial<Session>;
  onSubmit: (data: SessionCreateData) => void;
  onCancel: () => void;
  isSubmitting: boolean;
}

const SessionForm = ({ initialData, onSubmit, onCancel, isSubmitting }: SessionFormProps) => {
  const [date, setDate] = useState<Date | undefined>(
    initialData?.date ? new Date(initialData.date) : undefined
  );
  
  const [formData, setFormData] = useState<SessionCreateData>({
    title: initialData?.title || "",
    description: initialData?.description || "",
    date: initialData?.date || "",
    time: initialData?.time || "",
    capacity: initialData?.capacity || 10,
    price: initialData?.price || 20,
  });

  // Update the date string when the date picker changes
  useEffect(() => {
    if (date) {
      setFormData(prev => ({
        ...prev,
        date: format(date, "yyyy-MM-dd")
      }));
    }
  }, [date]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Handle numeric inputs
    if (name === "capacity" || name === "price") {
      const numValue = parseFloat(value);
      if (!isNaN(numValue) && numValue >= 0) {
        setFormData(prev => ({ ...prev, [name]: numValue }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title" className="text-white">
          Session Title
        </Label>
        <Input
          id="title"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          required
          className="bg-yalla-black text-white border-yalla-light-gray focus:border-yalla-green"
          placeholder="e.g. Morning HIIT Workout"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description" className="text-white">
          Description
        </Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          required
          className="bg-yalla-black text-white border-yalla-light-gray focus:border-yalla-green"
          placeholder="Describe what participants can expect from this session"
          rows={4}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-white">Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal bg-yalla-black text-white border-yalla-light-gray",
                  !date && "text-gray-400"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4 text-yalla-green" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-yalla-dark-gray border-yalla-light-gray">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
                className="bg-yalla-dark-gray text-white"
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label htmlFor="time" className="text-white">
            Time
          </Label>
          <Input
            id="time"
            name="time"
            value={formData.time}
            onChange={handleInputChange}
            required
            className="bg-yalla-black text-white border-yalla-light-gray focus:border-yalla-green"
            placeholder="e.g. 09:00 - 10:00"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="capacity" className="text-white">
            Capacity
          </Label>
          <Input
            id="capacity"
            name="capacity"
            type="number"
            min="1"
            value={formData.capacity}
            onChange={handleInputChange}
            required
            className="bg-yalla-black text-white border-yalla-light-gray focus:border-yalla-green"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="price" className="text-white">
            Price ($)
          </Label>
          <Input
            id="price"
            name="price"
            type="number"
            min="0"
            step="0.01"
            value={formData.price}
            onChange={handleInputChange}
            required
            className="bg-yalla-black text-white border-yalla-light-gray focus:border-yalla-green"
          />
        </div>
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="border-yalla-light-gray text-white hover:bg-yalla-dark-gray"
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="bg-yalla-green text-black hover:bg-yalla-green/90"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving..." : initialData?.id ? "Update Session" : "Create Session"}
        </Button>
      </div>
    </form>
  );
};

export default SessionForm;
