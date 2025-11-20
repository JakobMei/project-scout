import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, User } from "lucide-react";
import { useState } from "react";

interface Role {
  id: string;
  type: string;
  months: { month: string; assigned: boolean }[];
}

interface Employee {
  id: string;
  name: string;
}

interface Assignment {
  employeeId: string;
  employeeName: string;
  months: string[];
}

interface ProjectCardProps {
  name: string;
  scenario: string;
  roles: Role[];
  months: string[];
  assignments: Record<string, Assignment>;
  employees: Employee[];
  onAssign: (roleId: string, employeeId: string, employeeName: string, projectName: string, roleType: string) => void;
  onUnassign: (roleId: string, employeeName: string) => void;
}

export const ProjectCard = ({ name, scenario, roles, months, assignments, employees, onAssign, onUnassign }: ProjectCardProps) => {
  const [dragOverRole, setDragOverRole] = useState<string | null>(null);
  const getRoleBadgeColor = (roleType: string) => {
    switch (roleType.toLowerCase()) {
      case "dev":
        return "bg-primary/10 text-primary border-primary/20";
      case "ux":
        return "bg-accent/10 text-accent border-accent/20";
      case "asn":
        return "bg-warning/10 text-warning border-warning/20";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const handleDragOver = (e: React.DragEvent, roleId: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
    setDragOverRole(roleId);
  };

  const handleDragLeave = () => {
    setDragOverRole(null);
  };

  const handleDrop = (e: React.DragEvent, roleId: string, roleType: string) => {
    e.preventDefault();
    setDragOverRole(null);
    
    const employeeId = e.dataTransfer.getData("employeeId");
    const employeeName = e.dataTransfer.getData("employeeName");
    
    if (employeeId && employeeName) {
      onAssign(roleId, employeeId, employeeName, name, roleType);
    }
  };

  const getAssignment = (roleId: string): Assignment | undefined => {
    return assignments[roleId];
  };

  const isMonthAssigned = (roleId: string, month: string): boolean => {
    const assignment = assignments[roleId];
    return assignment ? assignment.months.includes(month) : false;
  };

  return (
    <Card className="p-4 hover:shadow-md transition-shadow">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground mb-1">{name}</h3>
        <p className="text-sm text-muted-foreground">{scenario}</p>
      </div>

      <div className="space-y-3">
        {roles.map((role) => {
          const assignment = getAssignment(role.id);
          const isDragOver = dragOverRole === role.id;
          
          return (
            <div 
              key={role.id} 
              className={`flex items-center gap-3 p-2 rounded-lg transition-all ${
                isDragOver ? "bg-primary/5 border-2 border-primary border-dashed" : ""
              }`}
              onDragOver={(e) => handleDragOver(e, role.id)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, role.id, role.type)}
            >
              <div className="flex items-center gap-2 min-w-[140px]">
                <Badge variant="outline" className={`${getRoleBadgeColor(role.type)} w-16 justify-center`}>
                  {role.type}
                </Badge>
                {assignment && (
                  <div className="flex items-center gap-1 text-xs bg-secondary rounded px-2 py-1 group relative">
                    <span className="font-medium truncate max-w-[60px]" title={assignment.employeeName}>
                      {assignment.employeeName}
                    </span>
                    <button
                      onClick={() => onUnassign(role.id, assignment.employeeName)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-3 h-3 text-muted-foreground hover:text-destructive" />
                    </button>
                  </div>
                )}
              </div>
              <div className="flex-1 flex gap-1">
                {role.months.map((monthData, idx) => {
                  const monthName = months[idx];
                  const isAssignedThisMonth = isMonthAssigned(role.id, monthName);
                  
                  return (
                    <div
                      key={idx}
                      className={`flex-1 h-8 rounded border transition-all relative group/cell ${
                        isAssignedThisMonth
                          ? "bg-primary border-primary hover:bg-primary/90"
                          : monthData.assigned
                          ? "bg-primary/20 border-primary/40 hover:bg-primary/30"
                          : "bg-muted/30 border-border hover:bg-muted/50"
                      } cursor-pointer overflow-hidden`}
                      title={
                        isAssignedThisMonth
                          ? `${monthData.month} - ${assignment?.employeeName}`
                          : `${monthData.month} - ${monthData.assigned ? "Assigned" : "Available"}`
                      }
                    >
                      {isAssignedThisMonth && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <User className="w-4 h-4 text-primary-foreground" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex gap-2 mt-4 pt-3 border-t border-border">
        {months.map((month, idx) => (
          <div key={idx} className="flex-1 text-center">
            <span className="text-xs font-medium text-muted-foreground">{month}</span>
          </div>
        ))}
      </div>
    </Card>
  );
};
