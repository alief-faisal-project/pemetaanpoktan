import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronLeft, Users, Search } from "lucide-react";
import { useState, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapLocationDot } from "@fortawesome/free-solid-svg-icons";

import { Layout } from "@/components/layout/Layout";
import { GroupCard } from "@/components/cards/GroupCard";
import { Button } from "@/components/ui/button";
import { SearchInput } from "@/components/ui/search-input";
import {
  getGroupsByDistrict,
  getDistrictBySlug,
} from "@/data/farmerGroups";
import { staggerContainer } from "@/components/layout/PageTransition";

const DistrictPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [searchQuery, setSearchQuery] = useState("");

  const district = getDistrictBySlug(slug || "");
  const allGroups = getGroupsByDistrict(slug || "");

  const filteredGroups = useMemo(() => {
    if (!searchQuery.trim()) return allGroups;
    const query = searchQuery.toLowerCase();
    return allGroups.filter(
      (group) =>
        group.name.toLowerCase().includes(query) ||
        group.village.toLowerCase().includes(query) ||
        group.chairperson.toLowerCase().includes(query)
    );
  }, [allGroups, searchQuery]);

  if (!district) {
    return (
      <Layout>
        <div className="container py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">
            Kecamatan tidak ditemukan
          </h1>
          <Link to="/">
            <Button variant="outline">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Kembali ke Beranda
            </Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Header Section */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-accent/20 py-12">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/">
              <Button variant="ghost" size="sm" className="mb-4">
                <ChevronLeft className="mr-1 h-4 w-4" />
                Kembali
              </Button>
            </Link>

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center justify-center"
                  >
                    <FontAwesomeIcon
                      icon={faMapLocationDot}
                      className="h-12 w-12 text-primary"
                    />
                  </motion.div>

                  <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                    Kecamatan {district.name}
                  </h1>
                </div>

                <p className="text-muted-foreground">
                  Daftar kelompok tani di wilayah Kecamatan {district.name}
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-border">
                  <Users className="h-5 w-5 text-primary" />
                  <div className="text-sm">
                    <span className="font-bold text-foreground">
                      {district.groupCount}
                    </span>
                    <span className="text-muted-foreground ml-1">
                      Poktan
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-border">
                  <Users className="h-5 w-5 text-primary" />
                  <div className="text-sm">
                    <span className="font-bold text-foreground">
                      {district.totalMembers}
                    </span>
                    <span className="text-muted-foreground ml-1">
                      Anggota
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Search and Grid Section */}
      <section className="py-12">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-8"
          >
            <SearchInput
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Cari nama poktan, desa, atau ketua..."
              className="max-w-md"
            />
          </motion.div>

          {filteredGroups.length > 0 ? (
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredGroups.map((group) => (
                <GroupCard key={group.id} group={group} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                Tidak ada hasil
              </h3>
              <p className="text-muted-foreground">
                Tidak ditemukan kelompok tani dengan kata kunci "
                {searchQuery}"
              </p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => setSearchQuery("")}
              >
                Hapus Pencarian
              </Button>
            </motion.div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default DistrictPage;
