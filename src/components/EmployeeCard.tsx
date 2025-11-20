import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User } from "lucide-react";

interface EmployeeCardProps {
  id: string;
  name: string;
  role: string;
  availability: number;
  status: "free" | "booked" | "partial";
  skills: string[];
}

export const EmployeeCard = ({ id, name, role, availability, status, skills }: EmployeeCardProps) => {
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData("employeeId", id);
    e.dataTransfer.setData("employeeName", name);
    e.dataTransfer.effectAllowed = "copy";
    
    // Add visual feedback
    const target = e.currentTarget as HTMLElement;
    target.style.opacity = "0.5";
  };

  const handleDragEnd = (e: React.DragEvent) => {
    const target = e.currentTarget as HTMLElement;
    target.style.opacity = "1";
  };
  const getStatusColor = () => {
    switch (status) {
      case "free":
        return "bg-success/10 text-success border-success/20";
      case "partial":
        return "bg-warning/10 text-warning border-warning/20";
      case "booked":
        return "bg-muted text-muted-foreground border-border";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getStatusText = () => {
    switch (status) {
      case "free":
        return "Available";
      case "partial":
        return "Partially Booked";
      case "booked":
        return "Fully Booked";
      default:
        return "Unknown";
    }
  };

  const getAvailabilityColor = () => {
    if (availability >= 80) return "text-success";
    if (availability >= 50) return "text-warning";
    return "text-muted-foreground";
  };

  return (
    <Card 
      className="p-4 hover:shadow-md transition-all cursor-move hover:border-primary/40 active:cursor-grabbing"
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
          <User className="w-5 h-5 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-foreground truncate">{name}</h4>
          <p className="text-sm text-muted-foreground">{role}</p>
        </div>
        <div className="text-right flex-shrink-0">
          <div className={`text-2xl font-bold ${getAvailabilityColor()}`}>
            {availability}%
          </div>
          <p className="text-xs text-muted-foreground">Available</p>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between">
        <Badge variant="outline" className={getStatusColor()}>
          {getStatusText()}
        </Badge>
      </div>

      <div className="mt-3 flex flex-wrap gap-1">
        {skills.map((skill, idx) => (
          <span
            key={idx}
            className="text-xs px-2 py-1 rounded-md bg-secondary text-secondary-foreground"
          >
            {skill}
          </span>
        ))}
      </div>
    </Card>
  );
};
