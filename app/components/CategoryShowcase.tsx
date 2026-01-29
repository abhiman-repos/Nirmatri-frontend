import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { ArrowRight } from "lucide-react";

const categories = [
  {
    id: 1,
    name: "Handmade Clothes",
    image: "https://images.unsplash.com/photo-1568371600021-36b968768c30?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5kbWFkZSUyMGNsb3RoaW5nfGVufDF8fHx8MTc2ODk4MDg4Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    count: "250+ items",
  },
  {
    id: 2,
    name: "Crochet Work",
    image: "https://images.unsplash.com/photo-1612208141706-2fbd2d45a143?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9jaGV0JTIwaGFuZG1hZGV8ZW58MXx8fHwxNzY4OTUzMDc4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    count: "180+ items",
  },
  {
    id: 3,
    name: "Pottery & Ceramics",
    image: "https://images.unsplash.com/photo-1611152171907-886a565484b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3R0ZXJ5JTIwYXJ0aXNhbnxlbnwxfHx8fDE3Njg5ODA4ODF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    count: "120+ items",
  },
  {
    id: 4,
    name: "Handwoven Textiles",
    image: "https://images.unsplash.com/photo-1748141951488-9c9fb9603daf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5kd292ZW4lMjB0ZXh0aWxlc3xlbnwxfHx8fDE3Njg5ODA4ODN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    count: "200+ items",
  },
];

export function CategoryShowcase() {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl dark:text-gray-100">Shop by Category</h2>
          <a href="#" className="text-blue-900 dark:text-blue-400 hover:text-blue-950 dark:hover:text-blue-300 flex items-center gap-1 text-sm md:text-base transition-all duration-300 hover:gap-2">
            View All <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category) => (
            <a
              key={category.id}
              href="#"
              className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
            >
              <div className="aspect-square relative">
                <ImageWithFallback
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:from-black/80 transition-all duration-500" />
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="text-lg mb-1 group-hover:scale-105 transition-transform duration-300">{category.name}</h3>
                <p className="text-sm opacity-90">{category.count}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}