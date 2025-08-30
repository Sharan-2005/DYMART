import { Card } from "@/components/ui/card";

interface CategoryCardProps {
  name: string;
  icon: string;
  itemCount: number;
}

const CategoryCard = ({ name, icon, itemCount }: CategoryCardProps) => {
  return (
    <Card className="group hover:shadow-hover transition-all duration-300 cursor-pointer p-6 text-center">
      <div className="w-8 h-8 mx-auto mb-4 bg-gradient-card rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
        <img src={icon} alt={name} className="w-8 h-8" />
      </div>
      <h3 className="font-semibold text-sm mb-1 group-hover:text-primary transition-colors">
        {name}
      </h3>
      <p className="text-xs text-muted-foreground">
        {itemCount}+ items
      </p>
    </Card>
  );
};

export default CategoryCard;