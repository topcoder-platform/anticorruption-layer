import axios, { isAxiosError } from "axios";
import { Util } from "./Util";

const { V5_RESOURCE_API_URL, V5_RESOURCE_ROLE_API_URL } = process.env;

class V5Api {
  public async getChallengeResources(
    challengeId: string,
    token: string
  ): Promise<ChallengeResource[]> {
    Util.assertIsDefined(V5_RESOURCE_API_URL);
    const res = await axios.get(`${V5_RESOURCE_API_URL}/?challengeId=${challengeId}&perPage=1000`, {
      headers: { authorization: `Bearer ${token}` },
    });
    return res.data as ChallengeResource[];
  }

  public async addChallengeResource(
    data: {
      challengeId: string;
      memberHandle: string;
      roleId: string;
    },
    token: string
  ): Promise<void> {
    Util.assertIsDefined(V5_RESOURCE_API_URL);
    let res;
    try {
      res = await axios.post(V5_RESOURCE_API_URL, data, {
        headers: { authorization: `Bearer ${token}` },
        validateStatus: function (status) {
          return status < 500;
        },
      });
      if (res.status > 201) {
        console.error(JSON.stringify(res.data));
      }
    } catch (e) {
      if (isAxiosError(e)) {
        console.error(e.message);
      } else {
        throw e;
      }
    }
  }

  public async getResourceRoles(): Promise<ResourceRole[]> {
    Util.assertIsDefined(V5_RESOURCE_ROLE_API_URL);
    const res = await axios.get(V5_RESOURCE_ROLE_API_URL);
    return res.data as ResourceRole[];
  }
}

export interface ChallengeResource {
  id: string;
  challengeId: string;
  memberId: string;
  memberHandle: string;
  roleId: string;
  created: string;
  createdBy: string;
  rating?: number;
}

export interface ResourceRole {
  id: string;
  name: string;
  legacyId: number;
  fullReadAccess: boolean;
  fullWriteAccess: boolean;
  isActive: boolean;
  selfObtainable: boolean;
}

export default new V5Api();
