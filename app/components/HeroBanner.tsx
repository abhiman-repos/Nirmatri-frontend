import { Button } from "@/app/components/ui/button";
import { ArrowRight, Heart } from "lucide-react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";

export function HeroBanner() {
  return (
    <section className="relative bg-transparent overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Content */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 bg-transparent">
              <Heart className="h-4 w-4 text-red-500 fill-red-500" />
              <span className="text-sm">Supporting 500+ Women Artisans</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl">
              Discover <span className="text-blue-900">Handcrafted</span> Treasures
            </h1>

            <p className="text-lg md:text-xl text-gray-700">
              Every purchase empowers talented local women artisans. Shop unique, 
              handmade items crafted with love and tradition.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-blue-900 hover:bg-blue-950 text-lg px-8">
                Shop Now <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 border-blue-900 text-blue-900 hover:bg-blue-50">
                Meet Our Artisans
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-6">
              <div>
                <div className="text-2xl md:text-3xl text-blue-900">500+</div>
                <div className="text-sm text-gray-600">Women Artisans</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl text-blue-900">10K+</div>
                <div className="text-sm text-gray-600">Happy Customers</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl text-blue-900">100%</div>
                <div className="text-sm text-gray-600">Handmade</div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1506806732259-39c2d0268443?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5kbWFkZSUyMGNyYWZ0c3xlbnwxfHx8fDE3Njg5MzQzNDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Handmade crafts"
                className="w-full h-[400px] md:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>

            {/* Floating Badge */}
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl">
              <div className="text-3xl mb-1">🎨</div>
              <div className="text-sm font-semibold">100% Authentic</div>
              <div className="text-xs text-gray-600">Handcrafted Items</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}