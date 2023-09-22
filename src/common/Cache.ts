import _ from "lodash";
import NodeCache from "node-cache";
import v5Api from "./v5Api";

const resourceRoleFromLegacy = "resource_role_map_from_legacy";
const resourceRoleToLegacy = "resource_role_map_to_legacy";

class Cache {
  internalCache: NodeCache;
  constructor() {
    this.internalCache = new NodeCache({ stdTTL: 1800 });
  }

  public async getResourceRoleMapFromLegacy(): Promise<RoleMapFromLegacy> {
    let roleMap: RoleMapFromLegacy | undefined = this.internalCache.get(resourceRoleFromLegacy);
    if (roleMap == null) {
      const roles = await v5Api.getResourceRoles();
      const newRoleMap: RoleMapFromLegacy = {};
      const newRoleMapToLegacy: RoleMapToLegacy = {};
      _.forEach(roles, (r) => {
        newRoleMap[r.legacyId] = r.id;
        newRoleMapToLegacy[r.id] = r.legacyId;
      });
      this.internalCache.set(resourceRoleFromLegacy, newRoleMap);
      this.internalCache.set(resourceRoleToLegacy, newRoleMapToLegacy);
      roleMap = newRoleMap;
    }
    return roleMap;
  }

  public async getResourceRoleMapToLegacy(): Promise<RoleMapToLegacy> {
    let roleMap: RoleMapToLegacy | undefined = this.internalCache.get(resourceRoleToLegacy);
    if (roleMap == null) {
      const roles = await v5Api.getResourceRoles();
      const newRoleMap: RoleMapToLegacy = {};
      const newRoleMapFromLegacy: RoleMapFromLegacy = {};
      _.forEach(roles, (r) => {
        newRoleMap[r.id] = r.legacyId;
        newRoleMapFromLegacy[r.legacyId] = r.id;
      });
      this.internalCache.set(resourceRoleToLegacy, newRoleMap);
      this.internalCache.set(resourceRoleFromLegacy, newRoleMapFromLegacy);
      roleMap = newRoleMap;
    }
    return roleMap;
  }
}

export interface RoleMapFromLegacy {
  [key: number]: string;
}

export interface RoleMapToLegacy {
  [key: string]: number;
}

export default new Cache();
