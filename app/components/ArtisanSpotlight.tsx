import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { MapPin, Award, Heart } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";

const artisans = [
  {
    id: 1,
    name: "Priya Sharma",
    location: "Jaipur, Rajasthan",
    specialty: "Embroidery & Textiles",
    story: "Creating beautiful embroidered pieces for over 15 years, preserving traditional Rajasthani art forms.",
    products: 45,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1719154717733-d37860cdee24?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMGFydGlzYW58ZW58MXx8fHwxNzY4OTgwODgyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: 2,
    name: "Meera Patel",
    location: "Khurja, Uttar Pradesh",
    specialty: "Pottery & Ceramics",
    story: "Third-generation potter bringing contemporary designs to traditional ceramic art.",
    products: 32,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1719154717733-d37860cdee24?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMGFydGlzYW58ZW58MXx8fHwxNzY4OTgwODgyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: 3,
    name: "Lakshmi Reddy",
    location: "Kanchipuram, Tamil Nadu",
    specialty: "Handwoven Sarees",
    story: "Weaving intricate silk sarees that carry forward centuries of Kanchipuram tradition.",
    products: 28,
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1719154717733-d37860cdee24?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMGFydGlzYW58ZW58MXx8fHwxNzY4OTgwODgyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
];

export function ArtisanSpotlight() {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-blue-50 dark:from-gray-950 dark:to-gray-990 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl mb-2 dark:text-gray-100">Meet Our Artisans</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Every product tells a story. Meet the talented women behind our handcrafted treasures.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {artisans.map((artisan) => (
            <Card key={artisan.id} className="overflow-hidden hover:shadow-xl transition-shadow duration-300 bg-white dark:bg-gray-800">
              <div className="relative h-50">
                <ImageWithFallback
                  src={artisan.image}
                  alt={artisan.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                {/* Badge */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
                  <Award className="h-4 w-4 text-blue-900" />
                  <span className="text-sm">{artisan.rating} ★</span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl mb-2 dark:text-gray-100">{artisan.name}</h3>

                <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400 mb-2">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm">{artisan.location}</span>
                </div>

                <div className="text-sm text-blue-900 dark:text-blue-400 mb-3">
                  {artisan.specialty}
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                  {artisan.story}
                </p>

                <div className="flex items-center justify-between pt-4 border-t dark:border-gray-700">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {artisan.products} Products
                  </span>
                  <Button size="sm" variant="outline" className="border-blue-900 dark:border-blue-400 text-blue-900 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-700">
                    View Store
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* CTA Banner */}
        <div className="bg-gradient-to-r from-blue-920 to-blue-810 rounded-2xl p-8 md:p-12 text-black text-center">
<Heart className="h-12 w-12 mx-auto mb-4 fill-red-400 text-orange-500" />
          <h3 className="text-2xl md:text-3xl mb-4">Your Purchase Makes a Difference</h3>
          <p className="text-lg mb-6 opacity-90 max-w-2xl mx-auto">
            Every item you buy directly supports local women artisans and helps preserve traditional crafts for future generations.
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="
              bg-white text-blue-900
              transition-all duration-300
               hover:bg-gray-100
                hover:px-8" 
          >
            Learn About Our Impact →
          </Button>

        </div>
      </div>
    </section>
  );
}