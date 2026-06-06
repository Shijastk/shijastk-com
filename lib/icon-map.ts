import type { IconType } from "react-icons";
import {
  BiLogoGithub,
  BiLogoLinkedinSquare,
  BiLogoGitlab,
  BiLinkExternal,
  BiEnvelope,
  BiGlobe,
} from "react-icons/bi";
import { FaSquareXTwitter } from "react-icons/fa6";

/**
 * Maps a stored `icon_key` (social links can't store React components in the
 * DB) to a react-icons component. Falls back to a generic link icon.
 */
const ICONS: Record<string, IconType> = {
  github: BiLogoGithub,
  linkedin: BiLogoLinkedinSquare,
  gitlab: BiLogoGitlab,
  twitter: FaSquareXTwitter,
  x: FaSquareXTwitter,
  email: BiEnvelope,
  portfolio: BiGlobe,
  website: BiGlobe,
  link: BiLinkExternal,
};

export const ICON_KEYS = Object.keys(ICONS);

export function getIcon(key: string): IconType {
  return ICONS[key] ?? BiLinkExternal;
}
