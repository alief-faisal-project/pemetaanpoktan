import { motion } from "framer-motion";
import { Users, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { District } from "@/data/farmerGroups";
import { staggerItem } from "@/components/layout/PageTransition";
import mapsIcon from "@/assets/maps-icon.png";

interface DistrictCardProps {
  district: District;
}

export const DistrictCard = ({ district }: DistrictCardProps) => {
  return (
    <motion.div
      variants={staggerItem}
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group relative overflow-hidden rounded-xl bg-card border border-border shadow-card hover:shadow-card-hover"
    >
      {/* Top accent bar */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-1 bg-primary"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.3 }}
      />

      <div className="p-6">
        <div className="flex items-center gap-4 mb-4">
          <motion.div
            className="flex h-12 w-12 items-center justify-center rounded-full overflow-hidden flex-shrink-0"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          >
            <img
              src={mapsIcon}
              alt="Maps"
              className="h-12 w-12 object-contain"
            />
          </motion.div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary">
            <Users className="h-4 w-4" />
            <span className="font-semibold text-sm">
              {district.totalMembers} Anggota Terdaftar
            </span>
          </div>
        </div>

        <h3 className="text-lg font-bold text-foreground mb-1">
          Kecamatan {district.name}
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          {district.groupCount} Kelompok Tani
        </p>

        <Link to={`/district/${district.slug}`}>
          <Button
            variant="outline"
            size="sm"
            className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
          >
            Lihat Kelompok Tani
            <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </div>
    </motion.div>
  );
};
