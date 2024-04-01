import JsonShardRpc from "../services/shard/ShardRpc.json";

export const getShardAndRPC = async (v) => {
  try {
    let find_zone = JsonShardRpc.zones.find(
      (zone) => JSON.stringify(zone.zone_index) === JSON.stringify(v)
    )
    return find_zone
  } catch (error) {
    return null
  }
};
