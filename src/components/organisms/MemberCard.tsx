import { Mail, MoreHorizontal } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
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

interface Member {
  id: string;
  name: string;
  role: string;
  email: string;
  avatar: string;
  projects: string[];
  tasks: { assigned: number; completed: number };
  performance: number;
  status: "online" | "offline";
}

interface MemberCardProps {
  member: Member;
}

export function MemberCard({ member }: MemberCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow duration-200">
      <CardHeader className="p-0">
        <div
          className={`h-1 ${
            member.status === "online" ? "bg-green-500" : "bg-gray-300"
          }`}
        ></div>
      </CardHeader>
      <CardContent className="pt-6 px-6 pb-4">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center">
            <Avatar className="h-12 w-12 mr-3">
              <AvatarFallback className="bg-[#1A365D] text-white">
                {member.avatar}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-gray-900">{member.name}</h3>
              <p className="text-sm text-gray-500">{member.role}</p>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Ver perfil</DropdownMenuItem>
              <DropdownMenuItem>Editar membro</DropdownMenuItem>
              <DropdownMenuItem>Enviar mensagem</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="space-y-4">
          <div className="flex items-center text-sm">
            <Mail className="h-4 w-4 mr-2 text-gray-400" />
            <span className="text-gray-600 truncate">{member.email}</span>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Performance</span>
              <span className="font-medium">{member.performance}%</span>
            </div>
            <Progress value={member.performance} className="h-2" />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Tarefas</span>
              <span className="font-medium">
                {member.tasks.completed}/{member.tasks.assigned}
              </span>
            </div>
            <Progress
              value={(member.tasks.completed / member.tasks.assigned) * 100}
              className="h-2"
            />
          </div>

          <div>
            <p className="text-sm text-gray-500 mb-2">Projetos</p>
            <div className="flex flex-wrap gap-1">
              {member.projects.map((project) => (
                <Badge key={project} variant="secondary" className="text-xs">
                  {project}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-gray-50 px-6 py-3 border-t">
        <Button variant="outline" className="w-full text-sm">
          <Mail className="h-4 w-4 mr-2" />
          Enviar mensagem
        </Button>
      </CardFooter>
    </Card>
  );
}
