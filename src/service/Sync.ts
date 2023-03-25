import { handleUnaryCall, sendUnaryData, ServerUnaryCall, UntypedHandleCall } from "@grpc/grpc-js";

import { SyncInput } from "../models/domain-layer/legacy/sync";

import { LegacySyncServer, LegacySyncService } from "../models/domain-layer/legacy/services/sync";

import { Empty } from "@topcoder-framework/lib-common";

import LegacySyncDomain from "../domain/Sync";

class LegacySyncServerImpl implements LegacySyncServer {
  [name: string]: UntypedHandleCall;

  syncLegacy: handleUnaryCall<SyncInput, Empty> = (
    call: ServerUnaryCall<SyncInput, Empty>,
    callback: sendUnaryData<Empty>
  ) => {
    LegacySyncDomain.syncLegacy(call.request, call.metadata)
      .then(() => callback(null))
      .catch((err) => callback(err, null));
  };
}

export { LegacySyncServerImpl as LegacySyncServer, LegacySyncService };
