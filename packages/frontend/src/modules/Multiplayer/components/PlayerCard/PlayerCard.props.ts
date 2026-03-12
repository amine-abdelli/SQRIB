import { Player } from "@sqrib/shared";

export interface PlayerCardProps {
  player: Player;
  showCase?: boolean;
  totalWords?: number;
  currentUsername?: string;
}
