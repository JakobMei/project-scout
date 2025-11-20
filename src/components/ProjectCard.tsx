import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Role {
  id: string;
  type: string;
  months: { month: string; assigned: boolean }[];
}

interface ProjectCardProps {
  name: string;
  scenario: string;
  roles: Role[];
  months: string[];
}

export const ProjectCard = ({ name, scenario, roles, months }: ProjectCardProps) => {
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

  return (
    <Card className="p-4 hover:shadow-md transition-shadow">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground mb-1">{name}</h3>
        <p className="text-sm text-muted-foreground">{scenario}</p>
      </div>

      <div className="space-y-3">
        {roles.map((role) => (
          <div key={role.id} className="flex items-center gap-3">
            <Badge variant="outline" className={`${getRoleBadgeColor(role.type)} w-16 justify-center`}>
              {role.type}
            </Badge>
            <div className="flex-1 flex gap-1">
              {role.months.map((monthData, idx) => (
                <div
                  key={idx}
                  className={`flex-1 h-8 rounded border transition-all ${
                    monthData.assigned
                      ? "bg-primary/20 border-primary/40 hover:bg-primary/30"
                      : "bg-muted/30 border-border hover:bg-muted/50"
                  } cursor-pointer`}
                  title={`${monthData.month} - ${monthData.assigned ? "Assigned" : "Available"}`}
                />
              ))}
            </div>
          </div>
        ))}
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
