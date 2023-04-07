import { ColumnType, Schema } from "@topcoder-framework/client-relational";
import { LegacyComponentVersion } from "../../models/domain-layer/legacy/component_version";

export const ComponentVersionSchema: Schema<LegacyComponentVersion> = {
  dbSchema: "tcs_catalog",
  tableName: "comp_versions",
  idSequence: "COMPVERSION_SEQ",
  idColumn: "comp_vers_id",
  idTable: "comp_versions",
  columns: {
    compVersId: { name: "comp_vers_id", type: ColumnType.COLUMN_TYPE_INT },
    componentId: { name: "component_id", type: ColumnType.COLUMN_TYPE_INT },
    version: { name: "version", type: ColumnType.COLUMN_TYPE_INT },
    versionText: { name: "version_text", type: ColumnType.COLUMN_TYPE_STRING },
    createTime: { name: "create_time", type: ColumnType.COLUMN_TYPE_DATETIME },
    modifyDate: { name: "modify_date", type: ColumnType.COLUMN_TYPE_DATETIME },
    phaseId: { name: "phase_id", type: ColumnType.COLUMN_TYPE_INT },
    phaseTime: { name: "phase_time", type: ColumnType.COLUMN_TYPE_STRING },
    price: { name: "price", type: ColumnType.COLUMN_TYPE_FLOAT },
    comments: { name: "comments", type: ColumnType.COLUMN_TYPE_STRING },
    suspendedInd: { name: "suspended_ind", type: ColumnType.COLUMN_TYPE_INT },
  },
};
