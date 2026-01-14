import { motion, useScroll, useTransform } from "framer-motion";
import { MapPin, Users, Building2, Send } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { StatCard } from "@/components/cards/StatCard";
import { StatCardCarousel } from "@/components/cards/StatCardCarousel";
import { DistrictCard } from "@/components/cards/DistrictCard";
import { getDistricts, getTotalStats } from "@/data/farmerGroups";
import { staggerContainer } from "@/components/layout/PageTransition";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import heroBackground from "@/assets/hero-background.jpeg";
import { FaEnvelope } from "react-icons/fa";

/* ================= CONTACT SECTION ================= */

const ContactSection = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Pesan dari ${name}`);
    const body = encodeURIComponent(
      `Nama: ${name}\nEmail: ${email}\n\nPesan:\n${message}`
    );
    window.location.href = `mailto:alieffaisal222@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact-section" className="py-16 bg-secondary">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-xl mx-auto"
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full mb-4">
              <FaEnvelope className="h-10 w-10 text-primary" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              Kirim Masukan
            </h2>
            <p className="text-muted-foreground">
              Punya saran atau pertanyaan? Kirim pesan kepada kami.
            </p>
          </div>

          <motion.form
            onSubmit={handleSubmit}
            className="space-y-4 bg-background rounded-xl p-6 shadow-lg border"
          >
            <div className="space-y-2">
              <Label htmlFor="name">Nama</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Pesan</Label>
              <Textarea
                id="message"
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </div>
            <Button type="submit" size="lg" className="w-full gap-2">
              <Send className="h-5 w-5" />
              Kirim Pesan
            </Button>
          </motion.form>
        </motion.div>
      </div>
    </section>
  );
};

/* ================= PAGE ================= */

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

  const statItems = [
    {
      icon: Users,
      value: stats.totalGroups,
      label: "Total Kelompok Tani",
      href: "/all-groups",
    },
    {
      icon: Building2,
      value: stats.totalDistricts,
      label: "Kecamatan",
      href: "/all-districts",
    },
    {
      icon: Users,
      value: stats.totalMembers,
      label: "Total Anggota",
      href: "/all-members",
    },
  ];

  return (
    <Layout>
      {/* ================= HERO ================= */}
      <section
        ref={heroRef}
        className="relative overflow-hidden py-20 md:py-32 min-h-[70vh] flex items-center"
      >
        {/* Background */}
        <motion.div className="absolute inset-0" style={{ y: backgroundY }}>
          <img
            src={heroBackground}
            alt="Petani padi di sawah"
            className="w-full h-[120%] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/40" />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
          />
        </motion.div>

        <div className="container relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ y: textY, opacity }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 leading-tight drop-shadow-lg">
              Pemetaan Petani{" "}
              <span className="text-primary">Kabupaten Pandeglang</span>
            </h1>

            <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto drop-shadow-md">
              Website pemetaan dan pengelolaan kelompok petani padi di seluruh
              wilayah Kabupaten Pandeglang, Banten.
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
                  className="bg-white/10 border border-white/30 text-white hover:bg-white/20 backdrop-blur-none"
                >
                  <MapPin className="h-5 w-5" />
                  Peta Persebaran Kelompok Tani
                </Button>
              </Link>
              {/* Button jelajahi Kecamatan */}
              <Button
                variant="outline"
                size="lg"
                asChild
                className="bg-white/10 border-white/30 text-white backdrop-blur-none hover:bg-white/20 hover:text-white"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("districts")?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }}
              >
                <a href="#districts">Jelajahi Kecamatan</a>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ================= STATS ================= */}
      <section className="py-12 bg-muted/30">
        <div className="container">
          {/* Mobile */}
          <div className="block md:hidden">
            <StatCardCarousel stats={statItems} />
          </div>

          {/* Desktop */}
          <div className="hidden md:grid md:grid-cols-3 gap-6">
            {statItems.map((item, i) => (
              <StatCard key={i} {...item} delay={i * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* ================= DISTRICTS ================= */}
      <section id="districts" className="py-16">
        <div className="container">
          <motion.div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
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
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {districts.map((district) => (
              <DistrictCard key={district.slug} district={district} />
            ))}
          </motion.div>
        </div>
      </section>

      <ContactSection />
    </Layout>
  );
};

export default Index;
