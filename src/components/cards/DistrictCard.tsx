import { motion } from "framer-motion";
import { MapPin, Users, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { District } from "@/data/farmerGroups";
import { staggerItem } from "@/components/layout/PageTransition";

interface DistrictCardProps {
  district: District;
}

export const DistrictCard = ({ district }: DistrictCardProps) => {
  return (
    <motion.div
      variants={staggerItem}
      whileHover={{ y: -4 }}
      className="group relative overflow-hidden rounded-xl bg-card border border-border shadow-card transition-shadow hover:shadow-card-hover"
    >
      {/* Top accent bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent text-accent-foreground">
            <MapPin className="h-6 w-6" />
          </div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Users className="h-4 w-4" />
            <span>{district.totalMembers}</span>
          </div>
        </div>

        <h3 className="text-lg font-bold text-foreground mb-1">
          Kecamatan {district.name}
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          {district.groupCount} Kelompok Tani
        </p>

        <Link to={`/district/${district.slug}`}>
          <Button variant="outline" size="sm" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
            Lihat Kelompok Tani
            <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </div>
    </motion.div>
  );
};
