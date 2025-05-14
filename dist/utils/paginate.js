"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginate = paginate;
function paginate({ page = 1, limit = 10 }) {
    const pageNumber = Math.max(Number(page) || 1, 1);
    const pageSize = Math.max(Number(limit) || 10, 1);
    return {
        offset: (pageNumber - 1) * pageSize,
        limit: pageSize,
        page: pageNumber,
        pageSize,
    };
}
