import { Icons } from "@/components/custom/icons";
import { siteConfig } from "@/config";
import { cn } from "@/lib/utils";
import { Facebook, Instagram } from "lucide-react";
import { Link } from "react-router-dom";

type Props = {
  containerClassName?: string;
  itemsClassName?: string;
};

export function StoreSocialMedias({ containerClassName, itemsClassName }: Props) {
  return (
    <div className={cn("flex gap-x-5", containerClassName)}>
      <Link to={siteConfig.links.github} target="_blank">
        <Icons.gitHub
          className={cn(
            "w-4 h-4 md:w-5 md:h-5 text-muted-foreground hover:text-violet-600 dark:hover:text-cyan-400 transition-colors duration-300",
            itemsClassName,
          )}
        />
      </Link>

      <Link to={siteConfig.links.facebook} target="_blank">
        <Facebook
          className={cn(
            "w-4 h-4 md:w-5 md:h-5 text-muted-foreground hover:text-primary",
            itemsClassName,
          )}
        />
      </Link>

      <Link to={siteConfig.links.instagram} target="_blank">
        <Instagram
          className={cn(
            "w-4 h-4 md:w-5 md:h-5 text-muted-foreground hover:text-primary",
            itemsClassName,
          )}
        />
      </Link>
    </div>
  );
}