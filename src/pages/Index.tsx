import { motion, useScroll, useTransform } from "framer-motion";
import { MapPin, Users, Building2 } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { StatCard } from "@/components/cards/StatCard";
import { DistrictCard } from "@/components/cards/DistrictCard";
import { getDistricts, getTotalStats } from "@/data/farmerGroups";
import { staggerContainer } from "@/components/layout/PageTransition";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useRef } from "react";
import heroBackground from "@/assets/hero-background.jpg";

const Index = () => {
  const districts = getDistricts();
  const stats = getTotalStats();
  const heroRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <Layout>
      {/* Hero Section with Parallax */}
      <section
        ref={heroRef}
        className="relative overflow-hidden py-20 md:py-32 min-h-[70vh] flex items-center"
      >
        {/* Background Image with Parallax */}
        <motion.div className="absolute inset-0" style={{ y: backgroundY }}>
          <img
            src={heroBackground}
            alt="Petani padi di sawah"
            className="w-full h-[120%] object-cover"
          />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/40" />
          {/* Additional gradient overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
          />
        </motion.div>

        <div className="container relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{ y: textY, opacity }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 leading-tight drop-shadow-lg">
              Pemetaan Kelompok Petani Padi di{" "}
              <span className="text-primary">Kabupaten Pandeglang</span>
            </h1>

            <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto drop-shadow-md">
              Website memetakan dan mengelola data kelompok tani
              (poktan) di seluruh wilayah Kabupaten Pandeglang, Banten.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap items-center justify-center gap-4"
            >
              <Link to="/map">
                <Button
                  size="lg"
                  className="gap-2 bg-primary hover:bg-primary/90 shadow-lg"
                >
                  <MapPin className="h-5 w-5" />
                  Peta Persebaran Poktan
                </Button>
              </Link>
              <Button
                variant="outline"
                size="lg"
                asChild
                className="bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm"
              >
                <a href="#districts">Jelajahi Kecamatan</a>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-muted/30">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard
              icon={Users}
              value={stats.totalGroups}
              label="Total Kelompok Tani"
              delay={0}
            />
            <StatCard
              icon={Building2}
              value={stats.totalDistricts}
              label="Kecamatan"
              delay={0.1}
            />
            <StatCard
              icon={Users}
              value={stats.totalMembers}
              label="Total Anggota"
              delay={0.2}
            />
          </div>
        </div>
      </section>

      {/* Districts Grid */}
      <section id="districts" className="py-16">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              Kecamatan di Kabupaten Pandeglang
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Pilih kecamatan untuk melihat data kelompok tani yang ada di
              wilayah tersebut.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {districts.map((district) => (
              <DistrictCard key={district.slug} district={district} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary/5">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Lihat Peta Lengkap
            </h2>
            <p className="text-muted-foreground mb-6">
              Jelajahi peta semua lokasi kelompok tani dan batas wilayah
              kecamatan.
            </p>
            <Link to="/map">
              <Button size="lg" className="gap-2">
                <MapPin className="h-5 w-5" />
                Peta Persebaran Poktan
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
