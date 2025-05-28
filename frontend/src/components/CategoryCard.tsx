import { Link } from "react-router-dom";
import { Category } from "../types";

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link
      to={`/categories/${category.id}`}
      className="group relative overflow-hidden rounded-lg bg-white shadow-md"
    >
      <div className="aspect-w-1 aspect-h-1 w-full">
        <img
          src={category.image}
          alt={category.name}
          className="h-48 w-full object-cover transition-transform group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-xl font-semibold text-white">{category.name}</h3>
        </div>
      </div>
    </Link>
  );
}
