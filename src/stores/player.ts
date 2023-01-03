import { defineStore } from "pinia";

export const usePlayerStore = defineStore("player", {
  // state
  state: () => {
    return {
      playerList: [] as PlayerInfo[],
      player: null as PlayerInfo | null,
    };
  },
  // getters
  getters: {
    playerList: (state) => state.playerList,
    player: (state) => state.player,
  },
  // actions
  actions: {
    addPlayer(player: PlayerInfo) {
      this.playerList.push(player);
    },
    setPlayer(player: PlayerInfo) {
      this.player = player;
    },
    updatePlayer(player: PlayerInfo) {
      this.playerList = this.playerList.map((p) => {
        if (p.address === player.address) {
          return player;
        }
        return p;
      });
    },
  },
});

export interface PlayerInfo {
  address: string;
  dealer: boolean;
  ready: boolean;
  defender: boolean;
  attacker: boolean;
  random_seed_hash: string | null;
  random_seed: number | null;
}
