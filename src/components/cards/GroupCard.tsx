import { motion } from "framer-motion";
import { Users, User, MapPin, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FarmerGroup } from "@/data/farmerGroups";
import { staggerItem } from "@/components/layout/PageTransition";
import { Badge } from "@/components/ui/badge";

interface GroupCardProps {
  group: FarmerGroup;
}

export const GroupCard = ({ group }: GroupCardProps) => {
  return (
    <motion.div
      variants={staggerItem}
      whileHover={{ y: -4 }}
      className="group relative overflow-hidden rounded-xl bg-card border border-border shadow-card transition-shadow hover:shadow-card-hover"
    >
      {/* Bilah aksen atas */}

      <div className="absolute top-0 left-0 right-0 h-1 bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <Badge
            variant="secondary"
            className="bg-accent text-accent-foreground"
          >
            {group.commodity}
          </Badge>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Users className="h-4 w-4" />
            <span>{group.memberCount} Anggota</span>
          </div>
        </div>

        <h3 className="text-lg font-bold text-foreground mb-3">{group.name}</h3>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <User className="h-4 w-4 shrink-0" />
            <span>Ketua: {group.chairperson}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 shrink-0" />
            <span>Desa {group.village}</span>
          </div>
        </div>

        <Link to={`/group/${group.id}`}>
          <Button
            variant="outline"
            size="sm"
            className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
          >
            Lihat Detail
            <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </div>
    </motion.div>
  );
};
