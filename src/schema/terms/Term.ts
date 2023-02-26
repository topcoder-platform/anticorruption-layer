import { ColumnType, Schema } from "@topcoder-framework/client-relational";
import { ProjectRoleTermsOfUseXref } from "../../models/domain-layer/legacy/term";
import { AuditColumns } from "../common/AuditColumns";

export const ProjectRoleTermsOfUseXrefSchema: Schema<ProjectRoleTermsOfUseXref> = {
  dbSchema: "tcs_catalog",
  tableName: "project_role_terms_of_use_xref",
  columns: {
    resourceRoleId: { name: "resource_role_id", type: ColumnType.COLUMN_TYPE_INT },
    projectId: { name: "project_id", type: ColumnType.COLUMN_TYPE_INT },
    termsOfUseId: { name: "terms_of_use_id", type: ColumnType.COLUMN_TYPE_INT },
    sortOrder: { name: "sort_order", type: ColumnType.COLUMN_TYPE_INT },
    groupInd: { name: "group_ind", type: ColumnType.COLUMN_TYPE_INT },
    createDate: AuditColumns.createDate,
    modifyDate: AuditColumns.modifyDate,
  },
};
