import { ProjectCard } from "@/components/ProjectCard";
import { EmployeeCard } from "@/components/EmployeeCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Users, Calendar, Search, Plus } from "lucide-react";

const Index = () => {
  const months = ["Jan", "Feb", "Mar"];

  const projects = [
    {
      id: "1",
      name: "Project 1",
      scenario: "Scenario",
      roles: [
        {
          id: "1",
          type: "DEV",
          months: [
            { month: "Jan", assigned: true },
            { month: "Feb", assigned: true },
            { month: "Mar", assigned: false },
          ],
        },
        {
          id: "2",
          type: "DEV",
          months: [
            { month: "Jan", assigned: true },
            { month: "Feb", assigned: false },
            { month: "Mar", assigned: false },
          ],
        },
        {
          id: "3",
          type: "UX",
          months: [
            { month: "Jan", assigned: false },
            { month: "Feb", assigned: true },
            { month: "Mar", assigned: true },
          ],
        },
        {
          id: "4",
          type: "ASN",
          months: [
            { month: "Jan", assigned: false },
            { month: "Feb", assigned: false },
            { month: "Mar", assigned: false },
          ],
        },
      ],
    },
    {
      id: "2",
      name: "Project 2",
      scenario: "Scenario / Opportunity",
      roles: [
        {
          id: "5",
          type: "DEV",
          months: [
            { month: "Jan", assigned: false },
            { month: "Feb", assigned: true },
            { month: "Mar", assigned: false },
          ],
        },
        {
          id: "6",
          type: "DEV",
          months: [
            { month: "Jan", assigned: false },
            { month: "Feb", assigned: false },
            { month: "Mar", assigned: false },
          ],
        },
        {
          id: "7",
          type: "UX",
          months: [
            { month: "Jan", assigned: false },
            { month: "Feb", assigned: false },
            { month: "Mar", assigned: true },
          ],
        },
        {
          id: "8",
          type: "ASN",
          months: [
            { month: "Jan", assigned: false },
            { month: "Feb", assigned: false },
            { month: "Mar", assigned: false },
          ],
        },
      ],
    },
  ];

  const employees = [
    {
      id: "1",
      name: "Sarah Chen",
      role: "Senior Developer",
      availability: 90,
      status: "free" as const,
      skills: ["React", "TypeScript", "Node.js"],
    },
    {
      id: "2",
      name: "Marcus Johnson",
      role: "UX Designer",
      availability: 80,
      status: "partial" as const,
      skills: ["Figma", "UI/UX", "Prototyping"],
    },
    {
      id: "3",
      name: "Elena Rodriguez",
      role: "Full Stack Developer",
      availability: 70,
      status: "partial" as const,
      skills: ["Vue", "Python", "AWS"],
    },
    {
      id: "4",
      name: "David Kim",
      role: "Backend Developer",
      availability: 0,
      status: "booked" as const,
      skills: ["Java", "Spring", "PostgreSQL"],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <Users className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">StaffFlow</h1>
                <p className="text-sm text-muted-foreground">Resource Planning Tool</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                <Calendar className="w-4 h-4 mr-2" />
                Timeline
              </Button>
              <Button size="sm">
                <Plus className="w-4 h-4 mr-2" />
                New Project
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Projects Section */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                Projects
              </h2>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search projects..." className="pl-9" />
              </div>
            </div>
            <div className="space-y-4">
              {projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  name={project.name}
                  scenario={project.scenario}
                  roles={project.roles}
                  months={months}
                />
              ))}
            </div>
          </div>

          {/* Availabilities Section */}
          <div className="space-y-4">
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-foreground flex items-center gap-2 mb-3">
                <Users className="w-5 h-5 text-primary" />
                Availabilities
              </h2>
              <p className="text-sm text-muted-foreground mb-3">
                Sorted by time availability
              </p>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search employees..." className="pl-9" />
              </div>
            </div>
            <div className="space-y-3">
              {employees.map((employee) => (
                <EmployeeCard
                  key={employee.id}
                  name={employee.name}
                  role={employee.role}
                  availability={employee.availability}
                  status={employee.status}
                  skills={employee.skills}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
