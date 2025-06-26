import { Calendar, Clock, MoreHorizontal, Users } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ProjectDetails } from "@/services/types/project.types";
import { getInitials } from "@/utils/getInitials";

interface ProjectCardProps {
  project: ProjectDetails;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const daysLeft = Math.ceil(
    (new Date(project.deadline).getTime() - new Date().getTime()) /
      (1000 * 60 * 60 * 24)
  );

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow duration-200">
      <CardHeader className="p-0">
        <div className="h-2" style={{ backgroundColor: project.color }}></div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-semibold text-lg text-gray-900">
              {project.name}
            </h3>
            <p className="text-gray-500 text-sm line-clamp-2 mt-1">
              {project.description}
            </p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>View details</DropdownMenuItem>
              <DropdownMenuItem>Edit project</DropdownMenuItem>
              <DropdownMenuItem>Archive</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="space-y-4">
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Progress</span>
              <span className="font-medium">{project.progress}%</span>
            </div>
            <Progress value={project.progress} className="h-2" />
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center text-sm text-gray-500">
              <Users className="h-4 w-4 mr-1" />
              <span>{project.members.length} members</span>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <Calendar className="h-4 w-4 mr-1" />
              <span>
                {project.tasks.completed}/{project.tasks.total} tasks
              </span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-gray-50 px-6 py-3 border-t flex justify-between items-center">
        <div className="flex -space-x-2">
          {project.members.slice(0, 3).map((member, i) => (
            <Avatar key={i} className="border-2 border-white w-8 h-8">
              <AvatarFallback className="bg-brand-primary text-white text-xs">
                {getInitials(member)}
              </AvatarFallback>
            </Avatar>
          ))}
          {project.members.length > 3 && (
            <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs font-medium">
              +{project.members.length - 3}
            </div>
          )}
        </div>
        <div className="flex items-center text-sm">
          <Clock className="h-4 w-4 mr-1 text-orange-500" />
          <span
            className={
              daysLeft < 5 ? "text-orange-500 font-medium" : "text-gray-500"
            }
          >
            {daysLeft} days left
          </span>
        </div>
      </CardFooter>
    </Card>
  );
}
