/* eslint-disable */
import type { handleUnaryCall, UntypedServiceImplementation } from "@grpc/grpc-js";
import { Empty } from "@topcoder-framework/lib-common";
import { SyncInput } from "../sync";

export type LegacySyncService = typeof LegacySyncService;
export const LegacySyncService = {
  syncLegacy: {
    path: "/topcoder.domain.service.sync.LegacySync/SyncLegacy",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: SyncInput) => Buffer.from(SyncInput.encode(value).finish()),
    requestDeserialize: (value: Buffer) => SyncInput.decode(value),
    responseSerialize: (value: Empty) => Buffer.from(Empty.encode(value).finish()),
    responseDeserialize: (value: Buffer) => Empty.decode(value),
  },
} as const;

export interface LegacySyncServer extends UntypedServiceImplementation {
  syncLegacy: handleUnaryCall<SyncInput, Empty>;
}
