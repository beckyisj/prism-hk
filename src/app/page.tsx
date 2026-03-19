import Hero from "@/components/Hero";
import SmartDispatcher from "@/components/SmartDispatcher";
import { getPublishedListings, getCategoryStats, getDistinctDistricts } from "@/lib/supabase";
import { CATEGORIES } from "@/lib/categories";
import FeaturedListings from "@/components/FeaturedListings";

export const revalidate = 300; // ISR every 5 minutes

export default async function HomePage() {
  const [listings, categoryStats, districts] = await Promise.all([
    getPublishedListings(),
    getCategoryStats(),
    getDistinctDistricts(),
  ]);

  const featured = listings.filter((l) => l.verified).slice(0, 6);
  const categoriesWithListings = categoryStats.filter((c) => c.count > 0).length;

  return (
    <>
      <Hero
        listingsCount={listings.length}
        categoriesCount={categoriesWithListings || CATEGORIES.length}
        districtsCount={districts.length || 18}
      />
      <SmartDispatcher />

      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-[#1E1B3A]">
            Featured Listings <span className="text-[#6B6890] font-medium">精選商戶</span>
          </h2>
          <p className="text-[#6B6890] mt-2 text-sm">
            Verified LGBTQ+-friendly organizations across Hong Kong
          </p>
        </div>
        <FeaturedListings listings={featured} />
      </section>

      <section className="max-w-5xl mx-auto px-6 pb-20">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-[#1E1B3A]">
            Browse by Category <span className="text-[#6B6890] font-medium">按類別瀏覽</span>
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {CATEGORIES.map((cat) => {
            const stat = categoryStats.find((s) => s.category === cat.id);
            return (
              <a
                key={cat.id}
                href={`/directory?category=${cat.id}`}
                className="flex items-center gap-3 p-4 bg-white rounded-xl border border-[#E8E6F0] hover:border-[#A78BFA] hover:shadow-md transition-all"
              >
                <div
                  className={`w-10 h-10 rounded-lg bg-gradient-to-br ${cat.gradient} flex items-center justify-center text-lg`}
                >
                  {cat.emoji}
                </div>
                <div>
                  <div className="font-semibold text-sm text-[#1E1B3A]">
                    {cat.en}
                  </div>
                  <div className="text-xs text-[#6B6890]">
                    {cat.zh} {stat ? `· ${stat.count}` : ""}
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </section>
    </>
  );
}
