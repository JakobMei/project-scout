import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, User } from "lucide-react";
import { useState } from "react";

interface AssignmentDialogProps {
  open: boolean;
  onClose: () => void;
  employeeName: string;
  projectName: string;
  roleType: string;
  months: string[];
  onConfirm: (selectedMonths: string[]) => void;
}

export const AssignmentDialog = ({
  open,
  onClose,
  employeeName,
  projectName,
  roleType,
  months,
  onConfirm,
}: AssignmentDialogProps) => {
  const [selectedMonths, setSelectedMonths] = useState<string[]>([]);

  const toggleMonth = (month: string) => {
    setSelectedMonths((prev) =>
      prev.includes(month) ? prev.filter((m) => m !== month) : [...prev, month]
    );
  };

  const handleConfirm = () => {
    if (selectedMonths.length > 0) {
      onConfirm(selectedMonths);
      setSelectedMonths([]);
      onClose();
    }
  };

  const handleCancel = () => {
    setSelectedMonths([]);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleCancel}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            Set Assignment Period
          </DialogTitle>
          <DialogDescription>
            Select the months when {employeeName} will be assigned to this role
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="flex items-center gap-2 p-3 bg-secondary rounded-lg">
            <User className="w-4 h-4 text-muted-foreground" />
            <div className="flex-1">
              <p className="text-sm font-medium">{employeeName}</p>
              <p className="text-xs text-muted-foreground">
                {projectName} - {roleType}
              </p>
            </div>
          </div>

          <div>
            <p className="text-sm font-medium mb-3">Select months:</p>
            <div className="flex gap-2 flex-wrap">
              {months.map((month) => (
                <Badge
                  key={month}
                  variant={selectedMonths.includes(month) ? "default" : "outline"}
                  className="cursor-pointer px-4 py-2 text-sm hover:scale-105 transition-transform"
                  onClick={() => toggleMonth(month)}
                >
                  {month}
                </Badge>
              ))}
            </div>
            {selectedMonths.length === 0 && (
              <p className="text-xs text-muted-foreground mt-2">
                Please select at least one month
              </p>
            )}
          </div>
        </div>

        <div className="flex gap-2 justify-end">
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleConfirm} disabled={selectedMonths.length === 0}>
            Assign ({selectedMonths.length} {selectedMonths.length === 1 ? "month" : "months"})
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
