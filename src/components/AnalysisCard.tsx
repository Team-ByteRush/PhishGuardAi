import { ReactNode, PropsWithChildren } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface AnalysisCardProps extends PropsWithChildren {
  icon: ReactNode;
  title: string;
  description: string;
  isActive?: boolean;
  onClick?: () => void;
}

const AnalysisCard = ({
  icon,
  title,
  description,
  children,
  isActive = false,
  onClick,
}: AnalysisCardProps) => {
  return (
    <Card
      role="button"
      tabIndex={0}
      aria-selected={isActive}
      onClick={onClick}
      className={cn(
        "relative border-0 bg-transparent shadow-none transition-transform duration-300",
        onClick && "cursor-pointer",
        isActive ? "scale-105" : "hover:scale-102"
      )}
    >
      <CardHeader className="relative pb-4">
        <div className="flex items-start gap-4">
          <div
            className={cn(
              "p-4 rounded-xl flex items-center justify-center text-2xl transition-all duration-300 shadow-inner",
              isActive
                ? "bg-gradient-to-br from-primary to-purple-500 text-white shadow-lg animate-pulse-glow"
                : "bg-muted text-muted-foreground"
            )}
          >
            {icon}
          </div>

          <div className="space-y-1">
            <CardTitle className="text-xl md:text-2xl font-bold text-foreground">
              {title}
            </CardTitle>
            <CardDescription className="text-sm md:text-base text-muted-foreground">
              {description}
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="relative">{children}</CardContent>
    </Card>
  );
};

export default function GlowingCardContainer({ cards }: { cards: AnalysisCardProps[] }) {
  return (
    <div className="relative p-8 rounded-3xl bg-gradient-to-br from-primary/10 via-purple/10 to-pink/10 shadow-glow overflow-hidden">

      <div className="absolute inset-0 bg-gradient-to-r from-primary via-purple to-pink opacity-20 blur-3xl animate-pulse-glow pointer-events-none rounded-3xl" />

      <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, idx) => (
          <AnalysisCard key={idx} {...card} />
        ))}
      </div>
    </div>
  );
}
