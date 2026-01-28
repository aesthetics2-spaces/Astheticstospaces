import React, { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Verified } from "lucide-react";
import { Link } from "react-router-dom";

const DesignCard = ({
  id,
  title,
  image,
  style,
  budget,
  price,
  room,
  roomType,
  isVerified = false,
  badge,
  onFavorite,
  isFavorite = false,
}) => {
  const [imgLoaded, setImgLoaded] = useState(false);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  const displayPrice = price || budget;
  const displayRoom = room || roomType;

  const detailUrl = `/design/${id}${displayRoom ? `?room=${displayRoom}` : ""}`;

  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
      className="group relative overflow-hidden rounded-2xl border border-border/70 bg-card shadow-md shadow-black/5 transition-shadow hover:shadow-lg hover:shadow-black/10"
    >
      <Link
        to={detailUrl}
        className="block outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 rounded-2xl"
        aria-label={`View ${title} design`}
      >
        {/* Image Container */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted/30">
          <motion.img
            src={image}
            alt={title}
            loading="lazy"
            className={`h-full w-full object-cover transition-opacity duration-300 ${
              imgLoaded ? "opacity-100" : "opacity-0"
            }`}
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            onLoad={() => setImgLoaded(true)}
          />

          {/* Loading placeholder */}
          {!imgLoaded && (
            <div className="absolute inset-0 animate-pulse bg-muted" />
          )}

          {/* Overlay gradient on hover */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            aria-hidden="true"
          />

          {/* Top badges */}
          <div className="absolute left-3 top-3 flex flex-wrap gap-2">
            {displayRoom && (
              <motion.span
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="rounded-full bg-background/90 px-2.5 py-1 text-[0.65rem] font-semibold text-foreground backdrop-blur-sm ring-1 ring-border/50"
              >
                {displayRoom}
              </motion.span>
            )}
            {isVerified && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-1 rounded-full bg-background/90 px-2 py-1 text-[0.65rem] font-semibold text-primary backdrop-blur-sm ring-1 ring-primary/20"
              >
                <Verified className="h-3 w-3" />
                <span>Verified</span>
              </motion.div>
            )}

            {badge && (
              <motion.span
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`rounded-full px-2.5 py-1 text-[0.65rem] font-semibold tracking-wide shadow-sm ring-1 backdrop-blur ${
                  badge.tone === "primary"
                    ? "bg-primary/15 text-primary ring-primary/25"
                    : badge.tone === "muted"
                    ? "bg-background/90 text-foreground ring-border"
                    : "bg-background/90 text-foreground ring-border"
                }`}
              >
                {badge.label}
              </motion.span>
            )}
          </div>

          {/* Favorite button */}
          {onFavorite && (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onFavorite(id, !isFavorite);
              }}
              className="absolute right-3 top-3 rounded-full bg-background/90 p-2 shadow-md ring-1 ring-border/50 backdrop-blur-sm transition-colors hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
              aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
            >
              <motion.div
                animate={{ scale: isFavorite ? [1, 1.2, 1] : 1 }}
                transition={{ duration: 0.3 }}
              >
                <Heart
                  className={`h-4 w-4 transition-colors ${
                    isFavorite
                      ? "fill-destructive text-destructive"
                      : "text-muted-foreground hover:text-destructive"
                  }`}
                />
              </motion.div>
            </button>
          )}
        </div>

        {/* Card Content */}
        <div className="p-4 space-y-2">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <h3 className="text-base font-semibold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                {title}
              </h3>
              {style && (
                <p className="mt-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {style}
                </p>
              )}
            </div>
          </div>

          {displayPrice && (
            <div className="flex items-center justify-between pt-2 border-t border-border/50">
              <span className="text-xs text-muted-foreground">Starting from</span>
              <span className="text-lg font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                {formatCurrency(displayPrice)}
              </span>
            </div>
          )}
        </div>
      </Link>
    </motion.article>
  );
};

export default DesignCard;
