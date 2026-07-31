import type { Receipt } from "../contexts/receipts/models/receipt";
import type { Refund } from "../contexts/refunds/models/refund";

export type PaginationMeta = {
  total: number;
  perPage: number;
  currentPage: number;
  lastPage: number;
  firstPage: number;
  firstPageUrl: string;
  lastPageUrl: string;
  nextPageUrl: string | null;
  previousPageUrl: string | null;
};

export type RefundIndex = {
  refunds: {
    meta: PaginationMeta;
    data: (Refund & {
      deletedAt: string | null;
      createdAt: string;
      updatedAt: string;
      receipt: Receipt & {
        refundId: string;
        createdAt: string;
        updatedAt: string;
      };
    })[];
  };
};

export type RefundShow = {
  refund: Refund & {
    deletedAt: string | null;
    createdAt: string;
    updatedAt: string;
    receipt: Receipt & {
      refundId: string;
      createdAt: string;
      updatedAt: string;
    };
  };
};

export type RefundCreatePayload = {
  title: string;
  category: Refund["category"];
  value: number;
  receipt: string;
};

export type RefundCreateResponse = {
  refund: Refund & {
    deletedAt: string | null;
    createdAt: string;
    updatedAt: string;
    receipt: Receipt & {
      refundId: string;
      createdAt: string;
      updatedAt: string;
    };
  };
};

export type RefundReceiptShow = {
  url: string;
};

export type RefundDelete = {
  message: string;
};

export type ReceiptCreate = {
  receipt: Receipt & {
    createdAt: string;
    updatedAt: string;
  };
};

export type ReceiptDelete = {
  message: string;
};
