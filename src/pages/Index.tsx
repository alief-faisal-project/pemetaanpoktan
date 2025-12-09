import { motion, useScroll, useTransform } from "framer-motion";
import { MapPin, Users, Building2, Mail, Send } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { StatCard } from "@/components/cards/StatCard";
import { DistrictCard } from "@/components/cards/DistrictCard";
import { getDistricts, getTotalStats } from "@/data/farmerGroups";
import { staggerContainer } from "@/components/layout/PageTransition";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import heroBackground from "@/assets/hero-background.jpg";

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
    <section className="py-16 bg-primary/5">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-xl mx-auto"
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-4">
              <Mail className="h-7 w-7 text-primary" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              Kirim Masukan
            </h2>
            <p className="text-muted-foreground">
              Punya saran dan masukan? kirim dibawah ya ╰⋃╯
            </p>
          </div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="space-y-4 bg-background rounded-xl p-6 shadow-lg border"
          >
            <div className="space-y-2">
              <Label htmlFor="name">Nama</Label>
              <Input
                id="name"
                placeholder="Masukkan nama ente disini"
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
                placeholder="Masukkan email disini"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Pesan</Label>
              <Textarea
                id="message"
                placeholder="Ketik pesan di sini ✎𓂃..."
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
              Pemetaan Petani Padi{" "}
              <span className="text-primary">Wilayah Kabupaten Pandeglang</span>
            </h1>

            <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto drop-shadow-md">
              Website pemetaan dan pengelolaan data kelompok tani padi di
              seluruh wilayah Kabupaten Pandeglang, Banten.
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
                  Peta Persebaran Tani
                </Button>
              </Link>
              <Button
                variant="outline"
                size="lg"
                asChild
                className="bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm transition-all duration-300"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("districts")?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }}
              >
                <motion.a
                  href="#districts"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  Kecamatan Terdata
                </motion.a>
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
              href="/all-groups"
            />
            <StatCard
              icon={Building2}
              value={stats.totalDistricts}
              label="Kecamatan"
              delay={0.1}
              href="/all-districts"
            />
            <StatCard
              icon={Users}
              value={stats.totalMembers}
              label="Total Anggota"
              delay={0.2}
              href="/all-members"
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

      {/* Contact Section */}
      <ContactSection />
    </Layout>
  );
};

export default Index;
