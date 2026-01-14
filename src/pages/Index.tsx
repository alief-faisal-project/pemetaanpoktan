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
import { useRef, useState, useMemo } from "react";
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
            <FaEnvelope className="h-10 w-10 text-primary mx-auto mb-4" />
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              Kirim Masukan
            </h2>
            <p className="text-muted-foreground">
              Punya saran atau pertanyaan? Kirim pesan kepada kami.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-4 bg-background rounded-xl p-6 shadow-lg border"
          >
            <div>
              <Label>Nama</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
              <Label>Email</Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <Label>Pesan</Label>
              <Textarea
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full gap-2">
              <Send className="h-5 w-5" /> Kirim Pesan
            </Button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

/* ================= PAGE ================= */

const Index = () => {
  /**
   * 🔒 DATA ASLI (DEEP CLONE SEKALI)
   * DistrictCard BOLEH mutasi → data ini tetap aman
   */
  const originalDistricts = useMemo(() => {
    return JSON.parse(JSON.stringify(getDistricts()));
  }, []);

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

  /* ================= SEARCH (TAMBAHAN AMAN) ================= */

  const [search, setSearch] = useState("");

  const normalize = (text: string) => text.toLowerCase().trim();

  /**
   * ❗ FILTER HANYA MENENTUKAN APA YANG DITAMPILKAN
   * ❗ TIDAK PERNAH MEMODIFIKASI DATA
   */
  const filteredDistricts = useMemo(() => {
    const q = normalize(search);
    if (!q) return originalDistricts;

    return originalDistricts.filter((district) => {
      const matchDistrict = normalize(district.name || "").includes(q);

      const matchGroup = district.groups?.some((group: any) =>
        normalize(group.name || "").includes(q)
      );

      const matchMember = district.groups?.some((group: any) =>
        group.members?.some((member: any) =>
          normalize(member.name || "").includes(q)
        )
      );

      return matchDistrict || matchGroup || matchMember;
    });
  }, [search, originalDistricts]);

  return (
    <Layout>
      {/* ================= HERO ================= */}
      <section
        ref={heroRef}
        className="relative overflow-hidden py-20 md:py-32 min-h-[70vh] flex items-center"
      >
        <motion.div className="absolute inset-0" style={{ y: backgroundY }}>
          <img
            src={heroBackground}
            alt="Petani padi di sawah"
            className="w-full h-[120%] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/40" />
        </motion.div>

        <div className="container relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ y: textY, opacity }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
              Pemetaan Petani{" "}
              <span className="text-primary">Kabupaten Pandeglang</span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* ================= STATS ================= */}
      <section className="py-12 bg-muted/30">
        <div className="container">
          <div className="block md:hidden">
            <StatCardCarousel stats={statItems} />
          </div>
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
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              Kecamatan di Kabupaten Pandeglang
            </h2>

            {/* 🔍 SEARCH BAR */}
            <div className="max-w-md mx-auto mt-6">
              <Input
                placeholder="Cari kecamatan, kelompok tani, atau anggota..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-12"
              />
            </div>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredDistricts.map((district) => (
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
